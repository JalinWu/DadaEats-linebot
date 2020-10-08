const express = require('express');
const app = express();
// 引用linebot SDK
const linebot = require('linebot');

const channelData = require('./config/config').channelData;

// 用於辨識Line Channel的資訊
const bot = linebot(channelData);
const linebotParser = bot.parser();

// 被加入好友
bot.on('follow', async (event) => {
    console.log(event);

    // 取得 user profile
    event.source.profile().then(function (profile) {
        console.log(profile);

        event.reply(`Hi, ${ profile.displayName }，感謝將我加為好友!`);
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
    event.reply('感謝將我加入群組')
})

// 被踢出群組/聊天室
bot.on('leave', async (event) => {
    console.log(event);
    console.log('被踢出群組了 QQ');
})

// 有人加入群組/聊天室
bot.on('memberJoined', async (event) => {
    console.log(event);
    event.reply('歡迎加入群組 ^^')
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
    if (userText == 'text') {
        // 準備要回傳的內容 
        // var replyMsg = `Hello你剛才說的是:${event.message.text}`; 
        var replyMsg = {
            type: 'text',
            text: `Hihi你剛才說的是:${event.message.text}`
        }
        // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者 
        event.reply(replyMsg).then(function (data) {
            // 當訊息成功回傳後的處理 
        }).catch(function (error) {
            // 當訊息回傳失敗後的處理 
        });
    } else if (userText == 'sticker') {
        var replyMsg = {
            type: 'sticker',
            packageId: '1',
            stickerId: '3'
        }
        // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者 
        event.reply(replyMsg).then(function (data) {
            // 當訊息成功回傳後的處理 
        }).catch(function (error) {
            // 當訊息回傳失敗後的處理 
        });
    } else if (userText == 'template') {
        var replyMsg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.cosmopolitan.com.hk/var/cosmopolitanhk/storage/images/entertainment/gakki/1/1746435-1-chi-HK/1_img_750_h.jpg",
                "imageBackgroundColor": "#F7F7F7",
                "title": "標題",
                "text": "文字",
                "actions": [
                    {
                        "type": "message",
                        "label": "動作 1",
                        "text": "動作 1"
                    },
                    {
                        "type": "message",
                        "label": "動作 2",
                        "text": "動作 2"
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
    }
});

// 推播
app.get('/pushMsg', (req, res) => {
    bot.push('U349dc7aa41a64c63aa27e6f31159f71a', '這是一個Push msg'); // (userId, msg content)

    res.send('success');
})

// Bot所監聽的webhook路徑與port
app.post('/linewebhook', linebotParser);

app.listen(3000, () => {
    console.log('[BOT已準備就緒]');
    console.log('Server started on port 3000');
});