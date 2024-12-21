//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 3000

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })

const sendMessage = (message) => {
    //取得所有連接中的 client
    let clients = wss.clients

    //做迴圈，發送訊息至每個 client
    clients.forEach(client => {
        client.send(JSON.stringify({
            type: 'message',
            data: {
                message,
            }
        }))
    })
}

setInterval(()=>{
    sendMessage('hello');
}, 10 * 1000);

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

    //連結時執行此 console 提示
    console.log('Client connected')

    
    //對 message 設定監聽，接收從 Client 發送的訊息
    ws.on('message', rawData => {
        const data = rawData.toString();
        let pares = false;

        try {
            pares = JSON.parse(data);
        } catch (e) {}

        if (!pares) {
            return;
        }

        switch (pares.type) {
            case 'send_message':
                sendMessage(pares.data.message);
                break;
        }
    })

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected')
    })
})