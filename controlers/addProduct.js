import {conn} from '../database/database.js'



export const addProduct = (req, res) => {
  let id = req.body.id,
        title = req.body.title,
        model = req.body.model,
        manufacturer = req.body.manufacturer,
        square = req.body.square,
        price = req.body.price,
        img = req.body.img
const sql = `INSERT INTO product(id, title, model, manufacturer, square, price, img) VALUES('${id}', '${title}', '${model}',' ${manufacturer}', ${square}, ${price}, '${img}')`
 
conn.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
};