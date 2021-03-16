const query = require('../db/db-connection');
const { multipleColumnSet, searchLikeColumnSet } = require('../utils/common.utils');
const padStart = require("string.prototype.padstart");
class GrnModel {
    tableName = 'grn';
    find = async (params = {}, range = {}, sort = {}) => {
        let sql = `SELECT grn.grn_no, grn.id,DATE_FORMAT(grn.grn_date,"%Y-%m-%d")grn_date,grn.po_id,grn.po_no,grn.supplier_id,grn.remarks,grn.refno,grn.postledger,grn.vou_no,DATE_FORMAT(grn.created_on,"%Y-%m-%d")created_on,grn.created_by,grnd.grn_details  FROM  grn
        LEFT JOIN ( select grn_id, 
                   JSON_ARRAYAGG(JSON_OBJECT('id',id,'stock_id',stock_id,'unit',unit,'qty_ord',qty_ord,'unit_price', unit_price, 'grn_id', grn_id, 'qty_rec', qty_rec, 'subtotal', subtotal))
                    as grn_details 
                    from grn_details GROUP BY grn_id) as
        grnd  ON grn.id =grnd.grn_id `;

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
            console.log(sql)
            return await query(sql);
        }

        const { columnSet, values } = searchLikeColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        sql += orderby + limit;
        console.log(sql)
        return await query(sql, [...values]);
    }
    findOne = async (params) => {
        if (typeof params == "object") {
            const keys = Object.keys(params);
            const values = Object.values(params).map((v) =>
                v == "id" ? `'${v}'` : `${v}`
            );
            const columnSet = keys
                .map((key) => (`${key} = ?`))
                .join(", ");
            let sql = `SELECT grn.grn_no, grn.id,DATE_FORMAT(grn.grn_date,"%Y-%m-%d")grn_date,grn.po_id,grn.po_no,grn.supplier_id,grn.remarks,grn.refno,grn.postledger,grn.vou_no,DATE_FORMAT(grn.created_on,"%Y-%m-%d") as created_on,grn.created_by,grnd.grn_details  FROM  grn
                    LEFT JOIN ( select grn_id, 
                               JSON_ARRAYAGG(JSON_OBJECT('id',id,'stock_id',stock_id,'unit',unit,'qty_ord',qty_ord,'unit_price', unit_price, 'grn_id', grn_id, 'qty_rec', qty_rec, 'subtotal', subtotal))
                                as grn_details 
                                from grn_details GROUP BY grn_id) 
                    grnd ON grn.id =grnd.grn_id 
                   WHERE ${columnSet} `

            const result = await query(sql, [...values]);

            return result[0];
        }
        return [];
    }

    list = async (params) => {


        const sql = `SELECT id,id as name,title as value FROM ${this.tableName}`;
        console.log(sql);
        const result = await query(sql);

        return result;

    }

    create = async ({ grn_date, po_id, created_on, created_by, supplier_id, po_no, refno, remarks, postledger, grn_details }) => {
        const sql = `INSERT INTO ${this.tableName} 
        (grn_no,grn_date,po_id,supplier_id,po_no,created_on,created_by,refno,remarks,postledger) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        let grn_no = await this.newGRNumber();
        console.log(sql);
        const result = await query(sql, [grn_no, grn_date, po_id, supplier_id, po_no, created_on, created_by, refno, remarks, postledger]);
        const grn_id = result.insertId;
        for (let grnd of grn_details) {
            const sql = `INSERT INTO grn_details 
                        (stock_id,unit,qty_ord,unit_price,subtotal,qty_rec,grn_id)
                         VALUES (?,?,?,?,?,?,?)`;
            console.log(sql);
            const result = await query(sql, [
                grnd.stock_id,
                grnd.unit,
                grnd.qty_ord,
                grnd.unit_price,
                grnd.subtotal,
                grnd.qty_rec,
                grn_id,
            ]);
        }

        if (postledger && postledger == 1) {
            // Post Ledger Entries
            console.log("Posting ledger entries is not yet implemented")
        }
        return grn_id;
    }
    update = async ({ grn_date, po_id, created_on, created_by, supplier_id, po_no, refno, remarks, postledger, grn_details }, id) => {
        let sql = `UPDATE grn SET 
                    grn_date = ?, po_id = ?,created_on=?, created_by=?, supplier_id = ?,po_no=?,refno=?,remarks=?,postledger=? WHERE id = ${id}`;
        console.log(sql);

        let result = await query(sql, [
            grn_date, po_id, created_on, created_by, supplier_id, po_no, refno, remarks, postledger
        ]);

        sql = `DELETE FROM  grn_details where grn_id = ${id}`;
        result = await query(sql, [id]);

        //=========================================
        //GRN Details ENTRY
        //=========================================
        for (let grnd of grn_details) {
            const sql = `INSERT INTO grn_details 
                        (stock_id,unit,qty_ord,unit_price,subtotal,qty_rec,grn_id)
                         VALUES (?,?,?,?,?,?,?)`;
            console.log(sql);
            const result = await query(sql, [
                grnd.stock_id,
                grnd.unit,
                grnd.qty_ord,
                grnd.unit_price,
                grnd.subtotal,
                grnd.qty_rec,
                id,
            ]);
        }

        if (postledger && postledger == 1) {
            // Post Ledger Entries
            console.log("Posting ledger entries is not yet implemented")
        }
        return id;
    }

    delete = async (id) => {
        let sql = `DELETE FROM ${this.tableName}
                      WHERE id = ?`;
        let result = await query(sql, [id]);
        sql = `DELETE FROM grn_details
        WHERE grn_id = ?`;
        result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    count = async (params = {}) => {
        let sql = `select count(*) as total FROM ${this.tableName}`;
        let result = "";
        if (Object.keys(params).length) {
            const { columnSet, values } = searchLikeColumnSet(params)
            sql += ` WHERE ${columnSet}`;
            console.log(sql)
            result = await query(sql, [...values]);

        } else {
            result = await query(sql);
        }
        var rows = JSON.parse(JSON.stringify(result));

        return rows[0].total;
    }

    newGRNumber = async () => {
        console.log("getting new GRN no");
        const todaysDate = new Date();
        let year = todaysDate.getFullYear();
        year = year.toString().substr(-2);
        const month = todaysDate.getMonth() + 1;
        let grn_no = "GRN" + year + padStart(month, 2, 0);

        const sql = 'SELECT max(id) maxno FROM grn';
        const result = await query(sql);
        let current_no = 1;
        if (result.length > 0) {
            current_no = result[0].maxno + 1;
        }

        grn_no = grn_no + "-" + padStart(current_no, 4, 0);
        console.log(grn_no);
        return grn_no;
    };
}

module.exports = new GrnModel;