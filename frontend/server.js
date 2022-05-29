const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
import cors from "cors";
import  client  from './redis.js';

// import scores	from '.scores.js';
require('dotenv').config();
const WebSocket = require('ws');


app.use(cors());

app.use(express.static(path.join(__dirname, '/')));

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/index.html'));
});


app.use('/', router);
app.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');
let publisher = client.duplicate()
let subs = client.duplicate()
client.connect();

publisher.connect(); 
subs.connect();

// client.pSubscribe("*", (mes, chan) => {
//   console.log("(front)Message:", mes);
//   console.log("(front)Channel:", chan);
//   if (chan == "new_score") {
//     console.log("saveScore");
//     if (MainController.saveScore(JSON.parse(mes))) {
//       MainController.updateScoreTable();
//     }
//   }
//   if (chan == "new_user") {
//     if (MainController.createUser(JSON.parse(mes))) {
//       console.log("Usuario creado");
//     }
//   }
// });


const server = new WebSocket.Server({ port : 3001 });

// Register event for client connection
server.on('connection', (ws) => {
	console.log('a user is connected, sending data...');
  let table_score = getTableScore();
  table_score.then((res)=>{
    console.log(res);
    ws.send(JSON.stringify(res));
  })
  client.pSubscribe("*", (mes, chan) => {
      console.log("(front)Message:", mes);
      console.log("(front)Channel:", chan);
      if (chan == "new_table") {
        let table_score = getTableScore();
        table_score.then((res)=>{
          console.log(res);
          ws.send(JSON.stringify(res));
        })
      }
    });
  // broadcast on web socket when receving a Redis PUB/SUB Event
  // subs.on('new_table', function(channel, message){
	// 	console.log(message);
  //   ws.send(message);
  // })
  router.post('/', function(req, res){
    publisher.publish("new_score", JSON.stringify(req.query));
    res.status(200);
  })
	ws.on('new_score', function(channel, message){
    console.log(message);
		
    
  })
	ws.on('data', function(channel, message){
		console.log(channel, message);
    console.log('222');
    ws.send('puto');
  })
  console.log(ws.eventNames());
});

async function getTableScore(){
  let ret = []
  for (let i = 0; i < 10; i++) {
    const v = await subs.get(''+i);
    if(v){
      ret.push(JSON.parse(v))
    }
  }
  return ret;
}

// scores.setScore(JSON.parse(client.get(1)))