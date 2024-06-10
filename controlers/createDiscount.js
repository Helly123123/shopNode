import {conn} from '../database/database.js'

export const createDiscount = async(req, res) => {
  let model = req.body.model,
        discount = req.body.discount

  let candidatPas = conn.query('SELECT price FROM product WHERE model = ?', [model], (error, price) =>{
    if (error) {
    } else if (price.length === 0) {
        res.status(401).send('data')
    } else {
        let priceBD = price[0].price
        const sql = `UPDATE product SET discountPrice = ${priceBD} WHERE model = '${model}'`;
    conn.query(sql, function(err, results) {
        if(err);
        else {
        const sqlt = `UPDATE product SET price = ${discount} WHERE model = '${model}'`;
         conn.query(sqlt, function(err, results) {
            if(err);
            else {
                const sql = `UPDATE product SET discount = ${1} WHERE model = '${model}'`;
        conn.query(sql, function(err, results) {
            if(err);
    })
            }
        })}})}})};
