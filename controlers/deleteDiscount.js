import {conn} from '../database/database.js'

export const deleteDiscount = async(req, res) => {
  let model = req.body.model,
      lastPrice = req.body.lastPrice
    const sql = `UPDATE product SET discount = ${0} WHERE model = '${model}'`;
    conn.query(sql, function(err, results) {
        if(err);
        else if (results.length === 0) {
            res.status(404)
        }
        else {
            const newPrice = `UPDATE product SET price = ${lastPrice} WHERE model = '${model}'`;
         conn.query(newPrice, function(err, results) {
            if(err);
            else{
                res.status(200)
            } })}
    }) 
}
