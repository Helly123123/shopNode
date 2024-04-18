import TelegramBot from 'node-telegram-bot-api'
import {bot} from '../index'

const token = '7036704223:AAGtQiamejcw9_sr2imXXWg_p64ok07M_qI';

export const bot = new TelegramBot(token, { polling: true });

bot.onText('/start', (msg) => {
  // Создание объекта с кнопками
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Кнопка 1', callback_data: 'btn1' }, { text: 'Кнопка 2', callback_data: 'btn2' }]
      ]
    })
  };

  // Отправка сообщения с кнопками
  bot.sendMessage(msg.chat.id, 'Выберите кнопку:', options);
});
