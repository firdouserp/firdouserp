./src/app/components/react_form/FormUserDetails.jsconst query = require('../db/db-connection');
const { multipleColumnSet,searchLikeColumnSet } = require('../utils/common.utils');
class VouchersModel {
    tableName = 'vouchers';
    find = async (params = {},range={},sort={}) => {
        let sql = `SELECT id,voucher_date,voucher_no,voucher_type,amount,remarks,prepared_by,project_id,created_by,chq_no,chq_date FROM ${this.tableName}`;
        let limit = "";
        let orderby =" ORDER BY id ASC";
        if (range && range.length){
            limit= ` LIMIT ${range[0]}, ${range[1]-range[0]+1}`;     
        }

        if (sort && sort.length){
            
            orderby= ` ORDER BY ${sort[0]} ${sort[1]}`;     
        }
       
        if (!Object.keys(params).length) {

            sql += orderby +limit;     
            console.log(sql)
            return await query(sql);
        }

        const { columnSet, values } = searchLikeColumnSet(params)
        sql += ` WHERE ${columnSet}`;

         sql += orderby+limit;   
        console.log(sql)
        return await query(sql, [...values]);
    }
    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT id,voucher_date,voucher_no,voucher_type,amount,remarks,prepared_by,project_id,created_by,chq_no,chq_date FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];

    }
    
  
    
    create = async ({voucher_date,voucher_no,voucher_type,amount,remarks,prepared_by,project_id,created_by,chq_no,chq_date}) => {
        const sql = `INSERT INTO ${this.tableName} 
        (voucher_date,voucher_no,voucher_type,amount,remarks,prepared_by,project_id,created_by,chq_no,chq_date) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        console.log(sql);
        const result = await query(sql, [voucher_date,voucher_no,voucher_type,amount,remarks,prepared_by,project_id,created_by,chq_no,chq_date]);
        return result.insertId;
    }
update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE vouchers SET ${columnSet} WHERE id = ?`;
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
count = async (params = {}) => {
    let sql = `select count(*) as total FROM ${this.tableName}`;
    let result = "";
    if (Object.keys(params).length) {
        const { columnSet, values } = searchLikeColumnSet(params)
        sql += ` WHERE ${columnSet}`; 
        console.log(sql)
        result = await query(sql, [...values]);
      
    }else{
        result = await query(sql);
    }
    var rows = JSON.parse(JSON.stringify(result));
    
    return rows[0].total;
}

voucherThisMonth = async (params = {}) => {
    
    let sql = `SELECT id,vou_type,  DATE_FORMAT(vou_date,'%d/%m') as vou_date, count(*) as count FROM ledger  WHERE   vou_date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() group by vou_date order by vou_date desc `;
    console.log(sql);
    const result= await query(sql);
    console.log(result);
    return result;
}
}

module.exports = new VouchersModel;