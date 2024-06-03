import express from 'express'

import passport from 'passport'
import {requserTime, Logger} from './middlewares.js'
import serverRouts from './routs/server.js'
import productRouts from './routs/addProduct.js'
import createDiscount from './routs/createDiscount.js'
import deleteDiscount from './routs/deleteDiscount.js'
import authRouts from './routs/auth.js'
import {Router} from 'express'
import {conn} from './database/database.js'
import cors from 'cors'
import databaseRouts from './routs/selectAllFromdb.js'
import searchProductDB from './routs/searchProduct.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import nodemailer from 'nodemailer'






const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
export const app = express()


app.use(cors())

app.use(express.static('public'));

app.get('/photo', (req, res) => {
    res.sendFile(__dirname + '/publick/photo.jpg');
});




app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requserTime)
app.use(Logger)

import bodyParser from 'body-parser'
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(passport.initialize())

app.use(searchProductDB)
app.use(deleteDiscount)
app.use(createDiscount)
app.use(authRouts)
app.use(serverRouts)
app.use(productRouts)
app.use(databaseRouts)


app.post('/send-email', async(req, res) => {
  const { email, message, code } = req.body;
  conn.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      if (results.length > 0) {
        res.status(200).send('привет') 
        console.log('емаил')
      } else {
        const transporter = nodemailer.createTransport({
          host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
              user: "maksim.birykov.2007@mail.ru",
              pass: "aKVtx928Wj2sn6bZpkjm"
            }
        })
            transporter.sendMail({
            from: "maksim.birykov.2007@mail.ru",
            to: email,
            subject: "привет",
            html:
            `
            <style>
            .x {
              color: red;
            }
            </style>
            <p class = "x" >Ваш код</p>
            <p>${code}</p>
            `
        })
        res.status(201).send('ку')
      }
  }
  
})});


app.post('/send-test', async(req, res) => {
  try {
    const { code } = req.body
    console.log(code)
  }
  catch (e) {
    console.log(e)
  }})




app.get('/search', (req, res) => {
  let search = req.query.search,
    manufacturer =  req.query.manufacturer,
    onePrice =  req.query.onePrice,
    twoPrice =  req.query.twoPrice

     console.log('============================================')
     console.log('производ ' + manufacturer + '' + typeof(manufacturer))
     console.log('модель ' + search + '' + typeof(search))
     console.log('первый' + onePrice + '' + typeof(onePrice))
     console.log('второй ' + twoPrice + '' + typeof(twoPrice))
     console.log('============================================')

    if (search.length === 0 && manufacturer.length === 0 && onePrice === undefined && twoPrice === undefined) {
        conn.query('SELECT * FROM product', (err, results) => {
        if (err) {
          console.error('Ошибка выполнения запроса: ' + err.stack);
          return res.status(500).send('Ошибка выполнения запроса');
        }
        
        res.json(results);
      });
    }
    else if (search.length > 0 && manufacturer.length === 0 && onePrice === undefined && twoPrice === undefined) {
      conn.query(`SELECT * FROM product WHERE model='${search}'`, (err, results) => {
                  if (err) {
                    console.log('ошибка первый этап')
                    res.status(500).send('Error searching for products');
                    return;
                  }
                  res.json(results);
                });
    }
    
    if (onePrice === undefined && twoPrice === undefined) {
      if (manufacturer.length > 0 && search.length > 0) {
        conn.query(`SELECT * FROM product WHERE manufacturer='${manufacturer}' AND model='${search}'`, (err, results) => {
                  if (err) {
                    res.status(500).send('Error searching for products');
                    return;
                  }
                  res.json(results);
                });
      }
      
      else if (manufacturer.length > 0 && search.length === 0) {
        conn.query(`SELECT * FROM product WHERE manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            console.log('ошибка первый этап')
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      } 
    }
    
    if (onePrice != undefined && twoPrice === undefined || onePrice === '729.325' ||  twoPrice === '729.325') {
      if (manufacturer.length === 0 && search.length === 0 && onePrice != undefined && (twoPrice === undefined || twoPrice === '729.325')) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}`, (err, results) => {
                    if (err) {
                      res.status(500).send('Error searching for products');
                      return;
                    }
                    res.json(results);
                  });
      }

      else if (manufacturer.length > 0 && search.length === 0 && onePrice != undefined  && (twoPrice === undefined || twoPrice === '729.325')) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}  AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length === 0 && search.length > 0 && onePrice != undefined && (twoPrice === undefined || twoPrice === '729.325')) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}  AND model='${search}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length > 0 && search.length > 0 && onePrice != undefined && (twoPrice === undefined || twoPrice === '729.325')) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}  AND model='${search}' AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }
    }

    if (onePrice === undefined && twoPrice != undefined || onePrice === '729.325' ||  twoPrice === '729.325') {
      if (manufacturer.length === 0 && search.length === 0 && (onePrice === undefined || onePrice === '729.325') && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)}`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length > 0 && search.length === 0 && (onePrice === undefined || onePrice === '729.325') && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)} AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length === 0 && search.length > 0 && (onePrice === undefined || onePrice === '729.325') && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)} AND model='${search}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length > 0 && search.length > 0 && (onePrice === undefined || onePrice === '729.325') && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)} AND model='${search}' AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }
    }

      if (onePrice != undefined && twoPrice != undefined || onePrice != '729.325' ||  twoPrice != '729.325') {
        if (manufacturer.length === 0 && search.length === 0 && onePrice != undefined && twoPrice != undefined) {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)}`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
        }
  
        else if (manufacturer.length > 0 && search.length === 0 && onePrice != undefined && onePrice != '729.325' && twoPrice != undefined && twoPrice != '729.325') {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)} AND manufacturer='${manufacturer}'`, (err, results) => {
            if (err) {
              res.status(500).send('Error searching for products');
              return;
            }
            res.json(results);
          });
        }
  
        else if (manufacturer.length === 0 && search.length > 0 && onePrice != undefined && onePrice != '729.325' && twoPrice != undefined && twoPrice != '729.325') {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)} AND model='${search}'`, (err, results) => {
            if (err) {
              res.status(500).send('Error searching for products');
              return;
            }
            res.json(results);
          });
        }
  
        else if (manufacturer.length > 0 && search.length > 0 && onePrice != undefined && onePrice != '729.325' && twoPrice != undefined && twoPrice != '729.325') {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)} AND manufacturer='${manufacturer}' AND model='${search}'`, (err, results) => {
            if (err) {
              res.status(500).send('Error searching for products');
              return;
            }
            res.json(results);
          });
        }
      }
});



import TelegramBot from 'node-telegram-bot-api'
import { unescape } from 'querystring'
    const token = '7036704223:AAGtQiamejcw9_sr2imXXWg_p64ok07M_qI';

    export const bot = new TelegramBot(token, { polling: true });


    bot.onText('/start', (msg) => {
      // Создание объекта с кнопками
      const options = {
        parse_mode: 'HTML',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Общая выручка', callback_data: 'btn1' }, { text: 'История покупок', callback_data: 'btn2' }]
          ]
        })
      };
    
      // Отправка сообщения с кнопками
      bot.sendMessage(msg.chat.id, '<b>Добро пожаловать в статистику магазина!</b>',options);
    });
    
    bot.on('callback_query', (query) => {
      const data = query.data;
    
    if(data === 'btn1') {

      } else if (data === 'btn2') {
        

      }
    });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

function generateAndCheckId() {
  return Math.floor(Math.random() * 900) + 100;
}

app.post('/upload', upload.single('photo'), (req, res) => {
    const photoPath = req.file.path;
    let title = req.body.title,
    model = req.body.model,
    manufacturer = req.body.manufacturer,
    square = req.body.square,
    price = req.body.price
      const sql = `INSERT INTO product(id, title, model, manufacturer, square, price, img) VALUES(${generateAndCheckId()}, '${title}', '${model}',' ${manufacturer}', ${square}, ${price}, '${photoPath.substr(7)}')`
      conn.query(sql, function(err, results) {
        if(err) console.log(err);
        console.log(results);
    });
});

app.post('/api/orders', (req, res) => {
  const { products } = req.body;

  conn.query('INSERT INTO orders (products) VALUES (?)', [products.join(', ')], (error, results) => {
    if (error) {
      console.error('Ошибка при сохранении заказа:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    } else {
      console.log('Заказ успешно сохранен');
      res.status(201).json({ message: 'Заказ успешно сохранен' });
    }
  });
});


app.use(express.static('uploads'));
app.listen(PORT, ()=> {
    console.log(`Все работае! Ваш порт ${PORT}`)
}) //запуск приложения