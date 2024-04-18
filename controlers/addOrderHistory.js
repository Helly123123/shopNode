// import {conn} from '../database/database.js'

// export const addHistoryOrder = (req, res) => {
//   let name = req.body.name,
//         surname = req.body.surname,
//         addres = req.body.addres,
//         number = req.body.number
//         orderHis = req.body.totalName
//    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
//     let order = `Дата заказа: ${date}\n\nИмя: ${name}\nФамилия: ${surname}\nАдрес доставки: ${addres}\nНомер: ${number}\nЗаказ: ${orderHis}`
// const sql = `INSERT INTO telegram(orderhistory) VALUES('${order}')`
 
// conn.query(sql, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
// };