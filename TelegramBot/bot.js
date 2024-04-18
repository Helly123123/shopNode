import TelegramBot from 'node-telegram-bot-api'
    const token = '7036704223:AAGtQiamejcw9_sr2imXXWg_p64ok07M_qI';

    export const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.text === '/start') {
        bot.sendMessage(chatId, 'Привет! Я простой телеграм бот. Чем могу помочь?\nпривет');
    } else if (msg.text === '/info') {
        bot.sendMessage(chatId, 'Это информационное сообщение от телеграм бота.');
    } else {
        bot.sendMessage(chatId, 'Я не понимаю такого сообщения. Попробуйте еще раз.');
    }
    });