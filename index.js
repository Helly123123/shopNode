import express from 'express'
import path from 'path'
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


app.use(authRouts)
app.use(serverRouts)
app.use(productRouts)
app.use(databaseRouts)


 

let a = 'pipka'
app.get('/datab', (req, res) => {
  conn.query(`SELECT * FROM users WHERE email='${a}'`, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      return res.status(500).send('Ошибка выполнения запроса');
    }
    
    res.json(results);
  });
});


app.listen(PORT, ()=> {
    console.log(`Все работае! Ваш порт ${PORT}`)
}) //запуск приложения