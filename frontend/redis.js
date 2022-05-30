import  {createClient}  from 'redis';



require('dotenv').config();

const client = createClient({
        url: process.env.REDIS_PATH, 
        // port: process.env.REDIS_PORT,
    });

    client.on("connect", function() {
        console.log("Connection Successful!!");
    });

    

export default client;