
import { createClient } from 'redis';

require('dotenv').config();

const client = createClient({
        // url: 'redis://127.0.0.1:6379',
        url: process.env.REDIS_PATH, 
        // port: process.env.REDIS_PORT,
    });

    client.on("connect", function() {
        console.log("Connection Successful!!");
    });

    client.on('error', (err) => console.log('Redis Client Error', err));


    

export default client;