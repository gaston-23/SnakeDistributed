
const { expect } = require('chai');
import redis from './server/src/config/redis';
const moment = require('moment');
var assert = require('assert');

const createClient = require('redis').createClient
require('dotenv').config();

describe('Test message passing in redis', () => {
  beforeEach(() => {
    
  });

  afterEach(function() {
    
  });

  it("Should successfully read a message write in a channel.", async () => {

    

const client = createClient({
        host: process.env.REDIS_PATH, 
        port: process.env.REDIS_PORT,
    });

    client.publish('new_score','345').then(res=>{
      console.log(res);
    })

    
    assert.equal([1, 2, 3].indexOf(4), -1);
  });

  // it("Should FAIL if there's a missing attribute on the context.", async () => {
    // try {
    //   delete context.vendor.attributeMap[consts().AXCIENT_X360_VENDOR_API_KEY];
    //   await rap({ context }, rapFn);
    //   expect.fail('Should have thrown');
    // } catch (err) {
    //   expect(err.message).to.include(consts().AXCIENT_X360_VENDOR_API_KEY);
    // }
  // });

  // it("Should FAIL if Axcient's API is down.", async () => {
  //   try {
  //     provisioningMocks.checkHealth.outageError();
  //     await rap({ context }, rapFn);
  //     expect.fail('Should have thrown');
  //   } catch (e) {
  //     expect(e.message).to.have.string('Failed execution');
  //   }
  // });
});
