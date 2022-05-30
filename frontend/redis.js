import  {createCluster}  from 'redis';



require('dotenv').config();

const client =createCluster({
    // url: 'redis://127.0.0.1:6379',
    rootNodes: [ {url: process.env.REDIS_PATH }]
    // port: process.env.REDIS_PORT,
});

    client.on("connect", function() {
        console.log("Connection Successful!!");
    });

    

export default client;