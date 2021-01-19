const query = require("../db/db-connection");
const {
  multipleColumnSet,
  searchLikeColumnSet,
  autoCompleteColumnSet,
} = require("../utils/common.utils");
class FpropModel {
  tableName = "fprop";
  find = async (params = {}, range = {}, sort = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;
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

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  create = async ({
   type,
   oid,
   value
  }) => {
    const sql = `INSERT INTO ${this.tableName} 
        (type,oid,value) VALUES (?,?,?)`;
    console.log(sql);
    const result = await query(sql, [
     type,
     oid,
     value
    ]);
    return result.insertId;
  };
  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE fprop SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);
    console.log(result);
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

  autocomplete = async (params = {}, sort = {}) => {
    let sql = `SELECT id,type,oid,value FROM ${this.tableName}`;
    let orderby = " ORDER BY title ASC";

    if (sort && sort.length) {
      orderby = ` ORDER BY ${sort[0]} ${sort[1]}`;
    }

    if (!Object.keys(params).length) {
      sql += orderby;
      console.log(sql);
      return await query(sql);
    }

    if (typeof params !== "object") {
      throw new Error("Invalid input");
    }

    const searchterm = "%" + Object.values(params) + "%";
    console.log("search term:" + searchterm);
    sql += ` WHERE scode like '${searchterm}' or code like '${searchterm}' or title like '${searchterm}'`;

    sql += orderby;
    console.log(sql);
    return await query(sql);
  };
}

module.exports = new FpropModel();
