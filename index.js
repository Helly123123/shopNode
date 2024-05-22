import express from 'express'
import path from 'path'
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

    // conn.query('SELECT * FROM product', (err, results) => {
    //   if (err) {
    //     console.error('Ошибка выполнения запроса: ' + err.stack);
    //     return res.status(500).send('Ошибка выполнения запроса');
    //   }
      
    //   res.json(results);
    // });
     
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
    
    if (onePrice != undefined && twoPrice === undefined) {
      if (manufacturer.length === 0 && search.length === 0 && onePrice != undefined && twoPrice === undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}`, (err, results) => {
                    if (err) {
                      res.status(500).send('Error searching for products');
                      return;
                    }
                    res.json(results);
                  });
      }

      else if (manufacturer.length > 0 && search.length === 0 && onePrice != undefined && twoPrice === undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}  AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length === 0 && search.length > 0 && onePrice != undefined && twoPrice === undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}  AND model='${search}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length > 0 && search.length > 0 && onePrice != undefined && twoPrice === undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${200000000}  AND model='${search}' AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }
    }

    if (onePrice === undefined && twoPrice != undefined) {
      if (manufacturer.length === 0 && search.length === 0 && onePrice === undefined && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)}`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length > 0 && search.length === 0 && onePrice === undefined && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)} AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length === 0 && search.length > 0 && onePrice === undefined && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)} AND model='${search}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }

      else if (manufacturer.length > 0 && search.length > 0 && onePrice === undefined && twoPrice != undefined) {
        conn.query(`SELECT * FROM product WHERE price >= ${0} AND price <= ${Number(twoPrice)} AND model='${search}' AND manufacturer='${manufacturer}'`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
      }
    }

      if (onePrice != undefined && twoPrice != undefined) {
        if (manufacturer.length === 0 && search.length === 0 && onePrice != undefined && twoPrice != undefined) {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)}`, (err, results) => {
          if (err) {
            res.status(500).send('Error searching for products');
            return;
          }
          res.json(results);
        });
        }
  
        else if (manufacturer.length > 0 && search.length === 0 && onePrice != undefined && twoPrice != undefined) {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)} AND manufacturer='${manufacturer}'`, (err, results) => {
            if (err) {
              res.status(500).send('Error searching for products');
              return;
            }
            res.json(results);
          });
        }
  
        else if (manufacturer.length === 0 && search.length > 0 && onePrice != undefined && twoPrice != undefined) {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)} AND model='${search}'`, (err, results) => {
            if (err) {
              res.status(500).send('Error searching for products');
              return;
            }
            res.json(results);
          });
        }
  
        else if (manufacturer.length > 0 && search.length > 0 && onePrice != undefined && twoPrice != undefined) {
          conn.query(`SELECT * FROM product WHERE price >= ${Number(onePrice)} AND price <= ${Number(twoPrice)} AND manufacturer='${manufacturer}' AND model='${search}'`, (err, results) => {
            if (err) {
              res.status(500).send('Error searching for products');
              return;
            }
            res.json(results);
          });
        }
      }
    


//     if (manufacturer === undefined) {
//       console.log('обычный посик')
//       if (search.length > 0) {
//         conn.query(`SELECT * FROM product WHERE model='${search}'`, (err, results) => {
//           if (err) {
//             console.log('ошибка первый этап')
//             res.status(500).send('Error searching for products');
//             return;
//           }
//           res.json(results);
//         });
//       }
//     }
    
//     if (search != undefined && manufacturer != undefined &&  twoPrice === undefined && onePrice === undefined ) {
//       if (manufacturer.length > 0 && search.length === 0) {
//         console.log(`первый этап ${manufacturer} ${search}`)
//         conn.query(`SELECT * FROM product WHERE manufacturer='${manufacturer}'`, (err, results) => {
//           if (err) {
//             console.log('ошибка первый этап')
//             res.status(500).send('Error searching for products');
//             return;
//           }
//           res.json(results);
//         });
//       }
//     else if (search.length > 0 && manufacturer.length > 0) { 
//       console.log(`второй этап ${manufacturer} ${search}`)
//       conn.query(`SELECT * FROM product WHERE manufacturer='${manufacturer}' AND model='${search}'`, (err, results) => {
//         if (err) {
//           res.status(500).send('Error searching for products');
//           return;
//         }
//         res.json(results);
//       });
//     }
//     }
//     //  else {
//     //   console.log('пизда')
//     //   console.log(manufacturer)
//     //   console.log(search)
//     // }

//     if (typeof(manufacturer) === String && twoPrice != undefined && onePrice != undefined) {
//       console.log('они undefined')
//     } 
//     if (manufacturer === String  && search.length === 0 &&  twoPrice != undefined && onePrice != undefined) {
//       console.log('они строки')
//       // if (manufacturer.length === 0 && search.length === 0) {
//       //   console.log('они строки и равны нулю')
//       // } else if (manufacturer.length > 0 && search.length > 0) {
//       //   console.log('они строки и больше нуля')
//       // }
//     }

//     // if (manufacturer === undefined && search === undefined && twoPrice != undefined && onePrice != undefined) {
//     //     console.log('цена работает')
//     //     conn.query(`SELECT * FROM product WHERE price >= ${onePrice} AND price <= ${twoPrice}`, (err, results) => {
//     //       if (err) {
//     //         res.status(500).send('Error searching for products');
//     //         return;
//     //       }
//     //       res.json(results);
//     //     });
      
//     // }
   
//     if (search.length > 0  && twoPrice != undefined && onePrice != undefined && twoPrice != undefined && onePrice != undefined) {
//       console.log('факт')
//     }
// });



// app.get('/manufacturer', (req, res) => {
//   const searchMan = req.query.term;
//   conn.query(`SELECT * FROM product WHERE manufacturer='${searchMan}'`, (err, results) => {
//     if (err) {
//       res.status(500).send('Error searching for products');
//       return;
//     }
//     res.json(results);
//   });
// });


// app.get('/price', (req, res) => {
  
//   const OnePrice = req.query.one;
//   const TwoPrice = req.query.two;
//   conn.query(`SELECT * FROM product WHERE price >= ${OnePrice} AND price <= ${TwoPrice}`, (err, results) => {
//     if (err) {
//       res.status(500).send('Error searching for products');
//       return;
//     }
//     res.json(results);
//   });
});






// import TelegramBot from 'node-telegram-bot-api'
// const bot = new TelegramBot('7036704223:AAGtQiamejcw9_sr2imXXWg_p64ok07M_qI', { polling: true });


// Маршрут для обработки запросов от вашего веб-приложения


    // bot.on('message', (msg) => {
    //       const chatId = msg.chat.id;
    //       app.post('/telebot', (req, res) => {
    //         const {name} = req.body;
    //         let a = 'sdasd'  
    //         if (a.length > 0) {
    //           bot.sendMessage(chatId, 'Привет! Я простой телеграм бот. Чем могу помочь?\nпривет');
    //       }
    //       })
    //        if (msg.text === '/info') {
    //           bot.sendMessage(chatId, 'Это информационное сообщение от телеграм бота.');
    //       } else {
    //           bot.sendMessage(chatId, 'Я не понимаю такого сообщения. Попробуйте еще раз.');
    //       }
    //       });

// import TelegramBot from 'node-telegram-bot-api'

// const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: true });

// app.post('/telebot', (req, res) => {
//   const chatId = '953111621'
//   const message = req.body.name; // Сообщение, которое нужно отправить

//   bot.sendMessage(chatId, message)
//     .then(() => {
//       res.status(200).send('Message sent');
//     })
//     .catch((error) => {
//       res.status(500).send('Error sending message');
//     });
// });


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


app.listen(PORT, ()=> {
    console.log(`Все работае! Ваш порт ${PORT}`)
}) //запуск приложения