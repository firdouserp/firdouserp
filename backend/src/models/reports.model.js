const query = require("../db/db-connection");
const { param } = require("../routes/coa.route");
const { multipleColumnSet } = require("../utils/common.utils");
class ReportsModel {
  accountbalances = async (params = {}) => {
    let sql = `select coa.* , sum(ledger.dr) debit, sum(ledger.cr) credit,abs(sum(transactions.dr)- sum(transactions.cr)) balance 
    from coa left outer  join transactions on coa.id=transactions.coa  group by transactions.coa order by coa.code;`;

    return await query(sql);
  };

  projectledger = async (params = {}) => {
    let sql = `SELECT id,coa_title,coa_code,coa_obal,count(*) as vou_count, sum(dr) debit,sum(cr) credit,abs(sum(dr)- sum(cr) + coa_obal) balance FROM view_project_ledger`;
    let groupby = " group by coa ";
    let orderby = " order by coa_code";

    if (!Object.keys(params).length) {
      sql += groupby + orderby;
      console.log(sql);
      return await query(sql);
    }

    const keys = Object.keys(params);
    let values = Object.values(params);
    const columnSet = keys
      .map((key) => {
        if (key == "vou_date_from") {
          return `vou_date>=?`;
        } else if (key == "vou_date_to") {
          return ` vou_date<=?`;
        } else if (key == "coa_title") {
          return ` coa_title like ? `;
        } else {
          return `${key}=?`;
        }
      })
      .join(" and ");

    values = values.map((value) => {
      let mkey = keys.find((key) => params[key] === value);
      if (mkey == "coa_title") {
        return `%${value}%`;
      } else {
        return value;
      }
    });

    sql += ` WHERE ${columnSet}`;

    sql += groupby + orderby;
    console.log(sql);
    console.log(JSON.stringify(keys));
    console.log(JSON.stringify(values));
    return await query(sql, [...values]);
  };

  projectledgerByAccount = async (id) => {
    let sql = `SELECT * from view_project_ledger where coa=${id}`;
    console.log(sql);
    return await query(sql);
  };
}

module.exports = new ReportsModel();
