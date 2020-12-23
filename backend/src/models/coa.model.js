const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class CoaModel {
    tableName = 'coa';
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
    
  
    
    create = async ({code,scode,title,iscashbook,isbankbook,notes,obal,active=0}) => {
        const sql = `INSERT INTO ${this.tableName} 
        (code,scode,title,iscashbook,isbankbook,notes,obal,active) VALUES (?,?,?,?,?,?,?,?)`;
        console.log(sql);
        const result = await query(sql, [code,scode,title,iscashbook,isbankbook,notes,obal,active]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;

}
update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE coa SET ${columnSet} WHERE id = ?`;

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

module.exports = new CoaModel;