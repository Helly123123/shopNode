import express from 'express'

import passport from 'passport'
import {requserTime, Logger} from './middlewares.js'
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
app.use( bodyParser.json() );     
app.use(bodyParser.urlencoded({  
  extended: true
}));

app.use(passport.initialize())

app.use(searchProductDB)
app.use(deleteDiscount)
app.use(createDiscount)
app.use(authRouts)
app.use(databaseRouts)


app.post('/send-email', async(req, res) => {
  const { email, message, code } = req.body;
  conn.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      if (results.length > 0) {
        res.status(200).send('привет') 
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
            subject: "Код регистрации",
            html:
            `
            <style>
            .x {
              color: red;
            }
            </style>
            <p>Приветствуем Вас!
          Спасибо за регистрацию на нашем сайте. Ваш уникальный код для подтверждения регистрации: <b>${code}</b>. <br/> Пожалуйста, введите этот код на странице, чтобы завершить процесс регистрации.
          <br/> <br/> Если у Вас возникнут какие-либо вопросы или проблемы, не стесняйтесь обратиться к нашей службе поддержки.
          <br/> <br/> С уважением,
          Команда Cold Wind.</p>
            `
        })
        res.status(201).send('ку')
      }
  }
  
})});

app.post('/send-test', async(req, res) => {
  try {
    const { code } = req.body
  }
  catch (e) {
  }})

app.get('/search', (req, res) => {
  let search = req.query.search,
    manufacturer =  req.query.manufacturer,
    onePrice =  req.query.onePrice,
    twoPrice =  req.query.twoPrice

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
      const sql = `INSERT INTO product(title, model, manufacturer, square, price, img) VALUES('${title}', '${model}','${manufacturer}', ${square}, ${price}, '${photoPath.substr(7)}')`
      conn.query(sql, function(err, results) {
        if(err);
    });
});


app.post('/api/orders', (req, res) => {
  const { products } = req.body;

  conn.query('INSERT INTO orders (products) VALUES (?)', [products.join(', ')], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    } else {
      res.status(201).json({ message: 'Заказ успешно сохранен' });
    }
  });
});


app.use(express.static('uploads'));
app.listen(PORT, ()=> {
}) //запуск приложения