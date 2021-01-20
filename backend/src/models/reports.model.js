const query = require("../db/db-connection");
class ReportsModel {
  accountbalances = async (params = {}) => {
    let sql = `select coa.* , sum(ledger.dr) debit, sum(ledger.cr) credit,abs(sum(ledger.dr)- sum(ledger.cr)) balance 
    from coa left outer  join ledger on coa.id=ledger.coa  group by ledger.coa order by coa.code;`;

    return await query(sql);
  };
}

module.exports = new ReportsModel();
