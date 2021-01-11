const query = require("../db/db-connection");
const {
  multipleColumnSet,
  searchLikeColumnSet,
} = require("../utils/common.utils");
const Role = require("../utils/userRoles.utils");
class ProjectsModel {
  tableName = "projects";

  find = async (params = {}, range = {}, sort = {}) => {
    console.log("project find params:" + JSON.stringify(params));
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

    // return back the first row (user)
    return result[0];
  };

  create = async ({
    code,
    scode,
    title,
    location,
    city,
    client,
    cost,
    nature,
    remarks,
    active,
  }) => {
    const sql = `INSERT INTO ${this.tableName}
        ( code, scode,title,location, city, client, cost, nature, remarks, active) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    console.log(sql);
    const result = await query(sql, [
      code,
      scode,
      title,
      location,
      city,
      client,
      cost,
      nature,
      remarks,
      active,
    ]);
    return result.insertId;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE projects SET ${columnSet} WHERE id = ?`;

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
}

module.exports = new ProjectsModel();
