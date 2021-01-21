const query = require("../db/db-connection");
class ReportsModel {
  accountbalances = async (params = {}) => {
    let sql = `select coa.* , sum(ledger.dr) debit, sum(ledger.cr) credit,abs(sum(ledger.dr)- sum(ledger.cr)) balance 
    from coa left outer  join ledger on coa.id=ledger.coa  group by ledger.coa order by coa.code;`;

    return await query(sql);
  };

  projectledger = async (params = {}) => {
    let sql = `SELECT *, sum(dr) debit,sum(cr) credit,abs(sum(ledger.dr)- sum(ledger.cr)) balance FROM firdouserp.view_project_ledger`
    let groupby = " group by coa "
    let orderby = " order by coa_code"

    if (!Object.keys(params).length) {
      sql += groupby + orderby;
      console.log(sql);
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    sql += groupby + orderby;
    console.log(sql);
    return await query(sql, [...values]);

  }
}

module.exports = new ReportsModel();
