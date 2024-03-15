import {conn} from '../database/database.js'



export const addProduct = (req, res) => {
  let title = req.body.title,
        model = req.body.model,
        manufacturer = req.body.manufacturer,
        square = req.body.square,
        price = req.body.price,
        img = req.body.img
  function generateUserId() {
    return Math.floor(Math.random() * 1000) + 1; // Генерация случайного числа от 1 до 1000
 }
const sql = `INSERT INTO product(id, title, model, manufacturer, square, price, img) VALUES('${generateUserId()}', '${title}', '${model}',' ${manufacturer}', ${square}, ${price}, '${img}')`
 
conn.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
};