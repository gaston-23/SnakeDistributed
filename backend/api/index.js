import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import redis from "./server/src/config/redis";

import models from "./server/src/models";
import MainController from './server/controllers/MainController'

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

// app.use('/v1/', AuthRoutes);

// when a random route is inputed
app.get("*", (req, res) => {
  res.status(200).send({
    message: "SnakeDistributed Backend API v1.0",
  });
});

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});


const publisher = redis.duplicate();
const listener = redis.duplicate();
redis.connect();
console.log('Redis conectado en: ',process.env.REDIS_PATH,process.env.REDIS_PORT);
// 
publisher.connect()
listener.connect();

listener.pSubscribe("*", (mes, chan) => {
  console.log("(redis)Message:", mes);
  console.log("(redis)Channel:", chan);
  if (chan == "new_score") {
    console.log("saveScore");
    MainController.saveScore(JSON.parse(mes)).then(()=>{
      publisher.publish("new_table",'')
    })
      // MainController.updateScoreTable();
    
  }
  if (chan == "new_user") {
    if (MainController.createUser(JSON.parse(mes))) {
      console.log("Usuario creado");
    }
  }
});

// tester.connect();

// for (let i = 0; i < 6; i++) {
//   tester
//   .publish("new_score", JSON.stringify({ user: 'Gaston', score: 23+i*100 }))
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((er) => {
//     console.log(er);
//   });
// }


// tester.pSubscribe("*", (mes, chan) => {
//   console.log("(tester)Message:", mes);
//   console.log("(tester)Channel:", chan);
//   if (chan == "new_table") {
//     console.log(JSON.parse(mes));
//   }
// });

export default app;
