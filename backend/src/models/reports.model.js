const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
class ReportsModel {
  accountbalances = async (params = {}) => {
    let sql = `select coa.* , sum(ledger.dr) debit, sum(ledger.cr) credit,abs(sum(transactions.dr)- sum(transactions.cr)) balance 
    from coa left outer  join transactions on coa.id=transactions.coa  group by transactions.coa order by coa.code;`;

    return await query(sql);
  };

  projectledger = async (params = {}) => {
    let sql = `SELECT *, sum(dr) debit,sum(cr) credit,abs(sum(dr)- sum(cr)) balance FROM view_project_ledger`;
    let groupby = " group by coa ";
    let orderby = " order by coa_code";

    if (!Object.keys(params).length) {
      sql += groupby + orderby;
      console.log(sql);
      return await query(sql);
    }

    const keys = Object.keys(params);
    const values = Object.values(params);
    const columnSet = keys
      .map((key) => {
        if (key == "vou_date_from") {
          return `vou_date>=?`;
        } else if (key == "vou_date_to") {
          return ` vou_date<=?`;
        } else {
          return `${key}=?`;
        }
      })
      .join(" and ");

    sql += ` WHERE ${columnSet}`;

    sql += groupby + orderby;
    console.log(sql);
    return await query(sql, [...values]);
  };
}

module.exports = new ReportsModel();
