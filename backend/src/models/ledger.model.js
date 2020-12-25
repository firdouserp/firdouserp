const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class LedgerModel {
    tableName = 'ledger';
    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];

    }

    create = async ({vou_no,vou_date,vou_type,srno,coa,supplier,project,stock,unit,employee,refno=null,chq_no=null,chq_date=null,dr,cr,description,remarks}) => {
       console.log(chq_date);
        const sql = `INSERT INTO ${this.tableName} 
        (vou_no,vou_date,vou_type,srno,coa,supplier,project,stock,unit,employee,refno,chq_no,chq_date,dr,cr,description,remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        console.log(chq_date);
        console.log(sql);
        const result = await query(sql, [vou_no,vou_date,vou_type,srno,coa,supplier,project,stock,unit,employee,refno,chq_no,chq_date,dr,cr,description,remarks]);
        return result.insertId;

}
update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE ledger SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
}

delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
}
}

module.exports = new LedgerModel;