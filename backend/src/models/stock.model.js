
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class StockModel {
    tableName = 'stock';
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
    create = async ({code,scode,title,uom,qty,avg_rate,adv_cost,remarks,active=0}) => {
        const sql = `INSERT INTO ${this.tableName} 
        (code,scode,title,uom,qty,avg_rate,adv_cost,remarks,active) VALUES (?,?,?,?,?,?,?,?,?)`;
        console.log(sql);
        const result = await query(sql, [code,scode,title,uom,qty,avg_rate,adv_cost,remarks,active]);
        return result.insertId;

}
update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE stock SET ${columnSet} WHERE id = ?`;
    console.log(sql);
    console.log(values);
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

module.exports = new StockModel;