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

var io = require("socket.io")(server, {
  //wsEngine: 'eiows', //instalar en json
  pingInterval: 10000,
  pingTimeout: 50000,
  cookie: false,
  perMessageDeflate: {
    threshold: 3276800,
  },
});

io.on("connection", (socket) => {
  // console.log('a user connected');
  socket.on("joinme", (room) => {
    // socket.rooms = {};
    socket.join(room);
    io.to(room).emit("customEmit", `Bienvenido a ${room}`);
  });

  socket.on("updateThis", (data, room) => {
    io.to(room).emit("orderUpdated", data);
  });
});

app.socketio = io;

const tester = redis.duplicate();
const publisher = redis.duplicate();
redis.connect();

publisher.connect();

redis.pSubscribe("*", (mes, chan) => {
  console.log("(redis)Message:", mes);
  console.log("(redis)Channel:", chan);
  if (chan == "new_score") {
    console.log("saveScore");
    if (MainController.saveScore(JSON.parse(mes))) {
      MainController.updateScoreTable();
    }
  }
  if (chan == "new_user") {
    if (MainController.createUser(JSON.parse(mes))) {
      console.log("Usuario creado");
    }
  }
});

tester.connect();

// tester
//   .publish("new_user", JSON.stringify({ name: 'Gaston', password: 'toor23' }))
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((er) => {
//     console.log(er);
//   });

// tester.pSubscribe("*", (mes, chan) => {
//   console.log("(tester)Message:", mes);
//   console.log("(tester)Channel:", chan);
//   if (chan == "new_table") {
//     console.log(JSON.parse(mes));
//   }
// });

export default app;
