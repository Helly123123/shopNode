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
// import addOrderHis from './routs/addOrderHistory.js'

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

// app.use(addOrderHis)
app.use(authRouts)
app.use(serverRouts)
app.use(productRouts)
app.use(databaseRouts)


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