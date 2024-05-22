import {conn} from '../database/database.js'

export const createDiscount = async(req, res) => {
  let model = req.body.model,
        discount = req.body.discount

  let candidatPas = conn.query('SELECT price FROM product WHERE model = ?', [model], (error, price) =>{
    if (error) {
        console.log(error)
    } else if (price.length === 0) {
        res.status(401).send('data')
    } else {
        console.log('1')
        let priceBD = price[0].price
        const sql = `UPDATE product SET discountPrice = ${priceBD} WHERE model = '${model}'`;
    conn.query(sql, function(err, results) {
        if(err) console.log(err);
        else {
        console.log(2)
        const sqlt = `UPDATE product SET price = ${discount} WHERE model = '${model}'`;
         conn.query(sqlt, function(err, results) {
            if(err) console.log(err);
            else {
                const sql = `UPDATE product SET discount = ${1} WHERE model = '${model}'`;
        conn.query(sql, function(err, results) {
            if(err) console.log(err);
    })
            }
        })}})}})};
