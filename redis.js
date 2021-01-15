/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const REDIS_HOST = 'ec2-18-219-214-35.us-east-2.compute.amazonaws.com';

const client = redis.createClient(REDIS_PORT);

client.on('ready', () => {
  console.log('Redis is on');
});

module.exports = {
  client,
};
