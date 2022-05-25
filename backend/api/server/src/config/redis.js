
// import { createClient } from 'redis';
const createClient = require('redis').createClient
require('dotenv').config();

const client = createClient({
        host: process.env.REDIS_PATH, 
        port: process.env.REDIS_PORT,
    });

    client.on("connect", function() {
        console.log("Connection Successful!!");
    });

    client.on('error', (err) => console.log('Redis Client Error', err));


    

export default client;