const express = require('express');

const app = express(); 
app.use('/', express.static('public'));

app.get('/sample', (req, res) => {
  res.send('sample.html')
})

let clientId = 0
let clients = {}
app.get('/information', function(req, res) {
  req.socket.setTimeout(Number.MAX_VALUE);
  res.writeHead(200, {
    // text/event-stream を追加
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    "Access-Control-Allow-Origin": "*",
  });
  res.write('\n');
  (clientId => {
    clients[clientId] = res
    req.on('close', function() {
      delete clients[clientId]
    })
  })(++clientId);
})

app.get('/notify', function(req, res) {
  for (let clientId in clients) {
    clients[clientId].write('event: notification' + '\n');
    clients[clientId].write('data: notify' + '\n\n');
  }
  res.send("更新しました！");
})

var USDJPY = 140.7;
setInterval(() => {
  if (getRandomInt(3) % 3 == 0) {
      USDJPY += Math.random() - 0.5;
      USDJPY = Math.round(USDJPY * Math.pow(10,1))/Math.pow(10,1);
      console.log('USD/JPY: ' + Object.keys(clients) + ' <- ' + USDJPY)
      for (let clientId in clients) {
        clients[clientId].write('event: USDJPY' + '\n');
        clients[clientId].write('data: ' + USDJPY + '\n\n');
      }
  }
}, 500);

var GBPUSD = 1.3045;
setInterval(() => {
  if (getRandomInt(2) % 2 == 0) {
      GBPUSD += (Math.random() - 0.5) / 1000;
      GBPUSD = Math.round(GBPUSD * Math.pow(10,4))/Math.pow(10,4);
      console.log('GBP/USD: ' + Object.keys(clients) + ' <- ' + GBPUSD)
      for (let clientId in clients) {
        clients[clientId].write('event: GBPUSD' + '\n');
        clients[clientId].write('data: ' + GBPUSD + '\n\n');
      }
  }
}, 700);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listing port http://localhost:${PORT}`);
})