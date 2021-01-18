const query = require("../db/db-connection");
const padStart = require("string.prototype.padstart");
const {
  multipleColumnSet,
  searchLikeColumnSet,
} = require("../utils/common.utils");
const Role = require("../utils/userRoles.utils");
class Purchase_orderModel {
  tableName = "purchase_order";

  find = async (params = {}, range = {}, sort = {}) => {
    console.log("purchase_order find params:" + JSON.stringify(params));


    let sql = `SELECT po.po_no,   po.id,DATE_FORMAT(po.purchase_date,"%Y-%m-%d")purchase_date,po.project_id,po.supplier_id,po.delivery_address,DATE_FORMAT(po.created_on,"%Y-%m-%d") created_on,po.created_by,po.status,po.description, pod.purchase_details  FROM  purchase_order po
              LEFT JOIN ( select po_id, 
                         JSON_ARRAYAGG(JSON_OBJECT('id',id,'stock_id',stock_id,'unit',unit,'qty',qty,'unit_price', unit_price, 'subtotal', subtotal))
                          as purchase_details 
                          from purchase_details GROUP BY po_id) 
              pod  ON po.id =pod.po_id `

    let limit = "";
    let orderby = " ORDER BY po.id desc";

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
    //const { columnSet, values } = multipleColumnSet(params);

    if (typeof params == "object") {
      const keys = Object.keys(params);
      const values = Object.values(params).map((v) =>
        v == "id" ? `'${v}'` : `${v}`
      );
      const columnSet = keys
        .map((key) => (`${key} = ?`))
        .join(", ");
      let sql = `SELECT  po.po_no, po.id,DATE_FORMAT(po.purchase_date,"%Y-%m-%d")purchase_date,po.project_id,po.supplier_id,po.delivery_address,DATE_FORMAT(po.created_on,"%Y-%m-%d")created_on,po.created_by,po.status,po.description, pod.purchase_details  FROM  purchase_order po
              LEFT JOIN ( select po_id, 
                         JSON_ARRAYAGG(JSON_OBJECT('id',id,'stock_id',stock_id,'unit',unit,'qty',qty,'unit_price', unit_price, 'subtotal', subtotal))
                          as purchase_details 
                          from purchase_details GROUP BY po_id) 
              pod  ON po.id =pod.po_id 
                WHERE ${columnSet} `

      const result = await query(sql, [...values]);

      // return back the first row (user)
      return result[0];
    }
    return [];
  };

  create = async ({
    purchase_date,
    project_id,
    supplier_id,
    delivery_address,
    created_on,
    created_by,
    status,
    description,
    purchase_details
  }) => {

    const po_no = await this.newPONumber();
    const sql = `INSERT INTO ${this.tableName}
        ( po_no,purchase_date,project_id,supplier_id, delivery_address, created_on, created_by, status,description) VALUES (?,?,?,?,?,?,?,?,?)`;
    console.log(sql);
    const result = await query(sql, [
      po_no,
      purchase_date,
      project_id,
      supplier_id,
      delivery_address,
      created_on,
      created_by,
      status,
      description
    ]);
    const po_id = result.insertId;
    for (let pod of purchase_details) {
      const sql = `INSERT INTO purchase_details 
                    (stock_id,unit,qty,unit_price,subtotal,po_id)
                     VALUES (?,?,?,?,?,?)`;
      console.log(sql);
      const result = await query(sql, [
        pod.stock_id,
        pod.unit,
        pod.qty,
        pod.unit_price,
        pod.subtotal,
        po_id,
      ]);
    }

    return po_id;
  };

  update = async ({
    id,
    po_no,
    purchase_date,
    project_id,
    supplier_id,
    delivery_address,
    created_on,
    created_by,
    status,
    description,
    purchase_details }) => {

    let sql = `UPDATE purchase_order SET 
      purchase_date = ?, project_id = ?, supplier_id = ?, delivery_address = ?,created_on=?, created_by=?,status=?, description=? WHERE id = ${id}`;
    console.log(sql);

    let result = await query(sql, [
      purchase_date,
      project_id,
      supplier_id,
      delivery_address,
      created_on,
      created_by,
      status,
      description
    ]);

    sql = `DELETE FROM  purchase_details where po_id = ${id}`;
    result = await query(sql, [id]);

    //=========================================
    //Purchase ORder Details ENTRY OF PO
    //=========================================
    let srno = 0;
    for (let pod of purchase_details) {
      const sql = `INSERT INTO purchase_details 
       (stock_id,unit,qty,unit_price,subtotal,po_id) VALUES (?,?,?,?,?,?)`;
      console.log(sql);
      const result = await query(sql, [
        pod.stock_id,
        pod.unit,
        pod.qty,
        pod.unit_price,
        pod.subtotal,
        id,
      ]);
    }
    return id;
  };

  delete = async (id) => {

    let sql = `DELETE FROM purchase_details WHERE po_id = ?`;
    let result = await query(sql, [id]);
    sql = `DELETE FROM purchase_order WHERE id = ?`;
    result = await query(sql, [id]);
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
  newPONumber = async () => {
    console.log("getting new PO no");
    const todaysDate = new Date();
    let year = todaysDate.getFullYear();
    year = year.toString().substr(-2);
    const month = todaysDate.getMonth() + 1;
    let po_no = "PO" + year + padStart(month, 2, 0);

    const sql = 'SELECT max(id) maxno FROM purchase_order';
    const result = await query(sql);
    let current_no = 1;
    if (result.length > 0) {
      current_no = result[0].maxno + 1;
    }

    po_no = po_no + "-" + padStart(current_no, 4, 0);
    console.log(po_no);
    return po_no;
  };

}

module.exports = new Purchase_orderModel();
