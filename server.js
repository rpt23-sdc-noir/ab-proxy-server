var express = require('express');
const { truncate } = require('fs');
var { createProxyMiddleware } = require('http-proxy-middleware');
var path = require('path');
var port = 8000;
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
require('newrelic');


var app = express();
app.use(express.static('client'))
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/songdata/', createProxyMiddleware({
//   target: 'http://52.37.102.63:3005/',
//   changeOrigin: true
// }));

// app.use('/relatedTracks/', createProxyMiddleware({
//   target: 'http://3.15.220.99:3001/',
//   changeOrigin: true
// }))

// app.use('/artistBio/', createProxyMiddleware({
//   target: 'http://34.220.154.45:2000/',
//   changeOrigin: true
// }))

// app.use('/songDescription/', createProxyMiddleware({
//   target: 'http://54.191.20.103:2001/',
//   changeOrigin: true
// }))

// app.use('/hashtags/', createProxyMiddleware({
//   target: 'http://18.189.26.97:4001/',
//   changeOrigin: true
// }))

app.use('/comments/', createProxyMiddleware({
  target: 'http://ec2-3-18-109-138.us-east-2.compute.amazonaws.com/',
  changeOrigin: true
}))

// app.use('/users/', createProxyMiddleware({
//   target: 'http://18.218.58.9:4002/',
//   changeOrigin: true
// }))

app.use('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
})

app.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}!`)
})