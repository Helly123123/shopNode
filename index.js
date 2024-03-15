import express from 'express'
import path from 'path'
import passport from 'passport'
import {requserTime, Logger} from './middlewares.js'
import serverRouts from './routs/server.js'
import productRouts from './routs/addProduct.js'
import authRouts from './routs/auth.js'
import {Router} from 'express'
import {conn} from './database/database.js'
import cors from 'cors'
import databaseRouts from './routs/selectAllFromdb.js'

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
export const app = express()


app.use(cors())

app.set('view engine', 'ejs')
console.log(app.get('views'))



app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requserTime)
app.use(Logger)

import bodyParser from 'body-parser'
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(passport.initialize())

app.use(authRouts)
app.use(serverRouts)
app.use(productRouts)
app.use(databaseRouts)


 

// let a = 'pipka'
// app.get('/datab', (req, res) => {
//   conn.query(`SELECT * FROM product WHERE email='${a}'`, (err, results) => {
//     if (err) {
//       console.error('Ошибка выполнения запроса: ' + err.stack);
//       return res.status(500).send('Ошибка выполнения запроса');
//     }
    
//     res.json(results);
//   });
// });

app.get('/search', (req, res) => {
  const searchTerm = req.query.term;
  conn.query(`SELECT * FROM product WHERE model='${searchTerm}'`, (err, results) => {
    if (err) {
      res.status(500).send('Error searching for products');
      return;
    }
    res.json(results);
  });
});

app.get('/manufacturer', (req, res) => {
  const searchMan = req.query.term;
  conn.query(`SELECT * FROM product WHERE manufacturer='${searchMan}'`, (err, results) => {
    if (err) {
      res.status(500).send('Error searching for products');
      return;
    }
    res.json(results);
  });
});


app.get('/price', (req, res) => {
  
  const OnePrice = req.query.one;
  const TwoPrice = req.query.two;
  conn.query(`SELECT * FROM product WHERE price >= ${OnePrice} AND price <= ${TwoPrice}`, (err, results) => {
    if (err) {
      res.status(500).send('Error searching for products');
      return;
    }
    res.json(results);
  });
});


app.listen(PORT, ()=> {
    console.log(`Все работае! Ваш порт ${PORT}`)
}) //запуск приложения