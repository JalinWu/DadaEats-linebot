const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
// 引用linebot SDK
const linebot = require('linebot');

const channelData = require('./config/config').channelData;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 用於辨識Line Channel的資訊
const bot = linebot(channelData);
const linebotParser = bot.parser();

// 被加入好友
bot.on('follow', async (event) => {
    console.log(event);

    // 取得 user profile
    event.source.profile().then(function (profile) {
        console.log(profile);

        // event.reply(`Hi, ${profile.displayName}，感謝將我加為好友!`);

        var replyMsg = {
            "type": "template",
            "altText": "DadaEats有新消息囉！",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.cosmopolitan.com.hk/var/cosmopolitanhk/storage/images/entertainment/gakki/1/1746435-1-chi-HK/1_img_750_h.jpg",
                "imageBackgroundColor": "#F7F7F7",
                "title": "最棒的團體訂餐平台",
                "text": "↓↓↓快快點選前往↓↓↓",
                "actions": [
                    {
                        "type": "uri",
                        "label": "前往 DadaEats",
                        "uri": "https://liff.line.me/1654985474-1K5daZn5"
                    },
                    {
                        "type": "uri",
                        "label": "查看購物車",
                        "uri": "https://liff.line.me/1654985474-wErn6kGr"
                    }
                ]
            }
        }
        // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者 
        event.reply(replyMsg).then(function (data) {
            // 當訊息成功回傳後的處理 
        }).catch(function (error) {
            // 當訊息回傳失敗後的處理 
        });

    });

    // event.reply('感謝將我加為好友')
})

// 被解除好友
bot.on('unfollow', async (event) => {
    console.log(event);
    console.log('被解除好友了 QQ');
})

// 被加入群組/聊天室
bot.on('join', async (event) => {
    console.log(event);
    // event.reply('感謝將我加入群組')
})

// 被踢出群組/聊天室
bot.on('leave', async (event) => {
    console.log(event);
    console.log('被踢出群組了 QQ');
})

// 有人加入群組/聊天室
bot.on('memberJoined', async (event) => {
    console.log(event);
    // event.reply('歡迎加入群組 ^^')
})

// 有人離開群組/聊天室
bot.on('memberLeft', async (event) => {
    console.log(event);
    console.log('有人離開群組了 QQ');
})

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
    // event.message.text是使用者傳給bot的訊息 
    var userText = event.message.text;

    if (userText.indexOf("牛") != -1) { // 字串包含"牛"
        var replyMsg = {}

        event.reply(replyMsg);
    }
    
});

// 推播
app.post('/pushMsg', (req, res) => { // 目前無法使用，body-parser cannot use，已解
    const { userIds, msg } = req.body;

    userIds.forEach(userId => {
        bot.push(userId, msg); // (userId, msg content)
    });

    res.send('success');
})

// Bot所監聽的webhook路徑與port
app.post('/linewebhook', linebotParser);

app.get('/', (req, res) => {
    res.send('HelloWorld!');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('[BOT已準備就緒]');
    console.log('Server started on port 3000');
});