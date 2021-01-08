const query = require("../db/db-connection");
const padStart = require("string.prototype.padstart");
const {
  multipleColumnSet,
  searchLikeColumnSet,
} = require("../utils/common.utils");
const { param } = require("express-validator");
class VouchersModel {
  tableName = "vouchers";
  find = async (params = {}, range = {}, sort = {}) => {
    let sql = `SELECT id,voucher_date,voucher_no,voucher_type,amount,remarks,prepared_by,project_id,created_by,chq_no,chq_date FROM ${this.tableName}`;
    let limit = "";
    let orderby = " ORDER BY id ASC";
    if (range && range.length) {
      limit = ` LIMIT ${range[0]}, ${range[1] - range[0] + 1}`;
    }

    if (sort && sort.length) {
      orderby = ` ORDER BY ${sort[0]} ${sort[1]}`;
    }

    if (!Object.keys(params).length) {
      sql += orderby + limit;
      console.log(sql);
      return await query(sql);
    }

    const { columnSet, values } = searchLikeColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    sql += orderby + limit;
    console.log(sql);
    return await query(sql, [...values]);
  };
  findOne = async (params) => {

    const { columnSet, values } = multipleColumnSet(params);
    console.log(params)
    let sql = `SELECT id,voucher_date as vou_date,voucher_no as vou_no,voucher_type as vou_type,amount,remarks,prepared_by,project_id as project,created_by,chq_no,chq_date FROM ${this.tableName}
        WHERE ${columnSet}`;
    let result = await query(sql, [...values]);
    let data = result[0];
    // let sql = `SELECT l.*,v.id as vou_id,v.amount,v.created_by,v.creation_date FROM firdouserp.vouchers as v inner join ledger as l 
    //             WHERE v.id=l.register_id
    //             AND v.id=`+ params['id'];

    // let result = await query(sql, [...values]);
    // if (result.length > 0) {
    //   console.log(result)
    //   let data = result[0];
    //   let transactions = result.map(row => { row['coa'] })
    //   data['transactions'] = transactions;
    //   console.log(data)
    //   return data;
    // }


    sql = `SELECT  * FROM LEDGER   WHERE register_id =` + data.id;
    result = await query(sql);
    data['transactions'] = result;
    console.log(data);
    return data;
  };
  //   {
  //     "vou_type": "5",
  //     "vou_date": "2021-01-07T09:41:30.311Z",
  //     "project": 1,
  //     "transactions": [
  //       {
  //         "coa": 10,
  //         "dr": 3,
  //         "cr": 0
  //       },
  //       {
  //         "coa": 96,
  //         "dr": 0,
  //         "cr": 3
  //       }
  //     ],
  //     "total_debit": 3,
  //     "total_credit": 3,
  //     "supplier": 100,
  //     "employee": 1,
  //     "stock": 1,
  //     "unit": 4,
  //     "chq_no": "256236989",
  //     "chq_date": "2021-01-08",
  //     "description": "This is Description",
  //     "remarks": "This is Remark"
  //   }

  vou_types = [
    { id: 1, code: "J", title: "Journal Voucher" },
    { id: 2, code: "P", title: "Payment Voucher" },
    { id: 3, code: "R", title: "Reciept Voucher" },
    { id: 4, code: "S", title: "Sales Voucher" },
    { id: 5, code: "SLR", title: "Salary Voucher" },
    { id: 6, code: "I", title: "Inventory Voucher" },
  ];
  create = async ({
    vou_date,
    vou_no,
    vou_type,
    project,
    supplier,
    employee,
    stock,
    unit,
    chq_no,
    chq_date,
    refno,
    description,
    remark,
    created_by,
    transactions,
    total_debit,
    total_credit,
  }) => {
    vou_no = await this.newVoucherNumber(vou_type);
    console.log(vou_no);
    const sql = `INSERT INTO ${this.tableName} 
        (voucher_date,voucher_no,voucher_type,amount,remarks,descriptions,project_id,created_by,chq_no,chq_date) VALUES (?,?,?,?,?,?,?,?,?)`;
    console.log(sql);
    const result = await query(sql, [
      vou_date,
      vou_no,
      vou_type,
      total_debit,
      remark,
      project,
      created_by,
      chq_no,
      chq_date,
    ]);
    const vou_id = result.insertId;

    //=========================================
    //LEDGER ENTRY OF VOUCHER
    //=========================================

    for (let transaction of transactions) {
      let srno = 1;
      const sql = `INSERT INTO ledger 
                    (register_id,vou_no,vou_date,vou_type,srno,coa,supplier,project,stock,unit,employee,refno,chq_no,chq_date,dr,cr,description,remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      const result = await query(sql, [
        vou_id,
        vou_no,
        vou_date,
        vou_type,
        srno,
        transaction.coa,
        supplier,
        project,
        stock,
        unit,
        employee,
        refno,
        chq_no,
        chq_date,
        transaction.dr,
        transaction.cr,
        description,
        remark,
      ]);
      srno = srno + 1;
      console.log(sql);
    }

    return vou_id;
  };
  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE vouchers SET ${columnSet} WHERE id = ?`;
    console.log(values);
    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
  count = async (params = {}) => {
    let sql = `select count(*) as total FROM ${this.tableName}`;
    let result = "";
    if (Object.keys(params).length) {
      const { columnSet, values } = searchLikeColumnSet(params);
      sql += ` WHERE ${columnSet}`;
      console.log(sql);
      result = await query(sql, [...values]);
    } else {
      result = await query(sql);
    }
    var rows = JSON.parse(JSON.stringify(result));

    return rows[0].total;
  };

  voucherThisMonth = async (params = {}) => {
    let sql = `SELECT id,vou_type,  DATE_FORMAT(vou_date,'%d/%m') as vou_date, count(*) as count FROM ledger  WHERE   vou_date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() group by vou_date order by vou_date desc `;
    console.log(sql);
    const result = await query(sql);
    console.log(result);
    return result;
  };

  newVoucherNumber = async (vou_type) => {
    console.log("getting new voucher no");
    const todaysDate = new Date();
    let year = todaysDate.getFullYear();
    year = year.toString().substr(-2);
    const month = todaysDate.getMonth() + 1;
    const day = todaysDate.getDay();
    let voutype = this.vou_types.find((v) => (v.id = vou_type));

    let vou_no = voutype.code + year + padStart(month, 2, 0);

    const sql =
      'SELECT maxno  FROM firdouserp.view_vouno where voucher="' + vou_no + '"';
    const result = await query(sql);
    console.log(sql);
    console.log(result);
    let current_no = 1;
    if (result.length > 0) {
      current_no = result[0].maxno + 1;
    }

    vou_no = vou_no + "-" + padStart(current_no, 4, 0);
    console.log(vou_no);
    return vou_no;
  };
}

module.exports = new VouchersModel();
