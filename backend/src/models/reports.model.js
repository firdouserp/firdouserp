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
    let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${id} and vou_date>='2021-06-01' and vou_date<='2021-06-30' order by vou_date,vou_no`;
    //let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${id}  order by vou_date,vou_no`;
    console.log(sql);
    return await query(sql);
  };

  trialBalanceByPeriod = async ({ vou_date_from, vou_date_to }) => {
    console.log("vou_date_from:" + vou_date_from);
    console.log("vou_date_to:" + vou_date_to);
    let result = {};
    if (vou_date_from && vou_date_to) {
      let sql = `select tbd.coa_id as id,ct_code,n_code,coa_code,ct_id,ct_title,n_id,n_title,tbd.coa_id,coa_code,coa_title,IFNULL(coa_obal, 0) as coa_obal,
                (IFNULL(coa_obal, 0)+ IFNULL(pl_dr,0)  - IFNULL(pl_cr,0)) open_balance, (IFNULL(coa_obal,0) + IFNULL(pl_dr,0) - IFNULL(pl_cr,0) + IFNULL(period.p_dr,0) - IFNULL(period.p_cr,0) ) as close_balance, IFNULL(pl_dr,0) as period_less_dr,IFNULL(pl_cr,0) as period_less_cr,IFNULL(period.p_dr,0) as p_dr,IFNULL(period.p_cr,0) as p_cr from trial_balance_detail tbd
                 left join 
                (select coa_id as coaid,sum(IFNULL(dr,0)) p_dr,sum(IFNULL(cr,0)) p_cr from trial_balance_detail  where vou_date>='${vou_date_from}' and vou_date<='${vou_date_to}' group by coa_id ) as period on tbd.coa_id=period.coaid
               left  join
                (select coa_id as pl_coaid,sum(IFNULL(dr,0)) pl_dr,sum(IFNULL(cr,0)) pl_cr from trial_balance_detail  where vou_date<'${vou_date_from}'group by coa_id) as periodl on tbd.coa_id=periodl.pl_coaid
              group by tbd.coa_id order by ct_code,n_code,coa_code;`;

      console.log(sql);
      result = await query(sql);
    }
    return result;
  };
}

module.exports = new ReportsModel();
