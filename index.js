const express = require('express');
const linebot = require('linebot');

const channelData = require('./config/config').channelData;

const app = express();
const bot = linebot(channelData);
const linebotParser = bot.parser();

bot.on('follow', async event => {
    console.log(event);

    event.source.profile().then(function (profile) {
        console.log(profile);

        event.reply('Thanks~ ' + profile.displayName);
    });

    event.reply('感謝將我加為好友');
})

bot.on('message', async event => {
    var replyMsg = `Hello你剛才說的是:${event.message.text}`; 
    // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者 
    event.reply(replyMsg).then(function (data) { 
        // 當訊息成功回傳後的處理 
    }).catch(function (error) { 
        // 當訊息回傳失敗後的處理 
    });
})

app.get('/pushMsg', (req, res) => {
    bot.push('U349dc7aa41a64c63aa27e6f31159f71a', '這是一個Push msg');

    res.send('success');
})

// bot.listen('/linewebhook', 3000, function () {
//     console.log('[BOT已準備就緒]');
//     bot.push('U349dc7aa41a64c63aa27e6f31159f71a', '這是一個Push msg');
// });

app.post('/linewebhook', linebotParser);

app.listen(3000, () => {
    console.log('[BOT已準備就緒]');
    console.log('Server started on port 3000');
});

// rich menu id
// {
//     "richMenuId": "richmenu-36c15b842b1fe80232d5bf1d49a76e98"
// }
