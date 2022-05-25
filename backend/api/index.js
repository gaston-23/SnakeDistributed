import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import redis from './server/src/config/redis';




const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

// app.use('/v1/', AuthRoutes);



// when a random route is inputed
app.get('*', (req, res) => {
	res.status(200).send({
		message: 'SnakeDistributed Backend API v1.0'
	});
});

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});

var io = require('socket.io')(server,{
	//wsEngine: 'eiows', //instalar en json
	pingInterval: 10000,
	pingTimeout: 50000,
	cookie: false,
    perMessageDeflate: {
        threshold: 3276800
    }
});

io.on('connection', (socket)=>{
	// console.log('a user connected');
	socket.on('joinme', (room) => {
		// socket.rooms = {};
		socket.join(room);
		io.to(room).emit('customEmit',`Bienvenido a ${room}`);
	});
	
	socket.on('updateThis', (data,room)=>{
		io.to(room).emit('orderUpdated',data);
	})
});

app.socketio= io;

redis.connect();

export default app;