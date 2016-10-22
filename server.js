//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
var fs = require('fs');
var path = require('path');
//var config = require('./webpack.config');



var express = require('express');
var http = require('http');
var morgan = require('morgan');


//new WebpackDevServer(webpack(config), {
//  publicPath: config.output.publicPath,
//  hot: true,
//  historyApiFallback: true
//}).listen(3000, 'localhost', function (err, result) {
//  if (err) {
//    return console.log(err);
//  }
//
//  console.log('Listening at http://localhost:3000/');
//});


let app = express();
let server = http.createServer(app);

app.use(morgan('dev'));

app.get('/', function(req, res) {
   fs.readFile('./index.html', (err, data) => {
       res.end(data);
   });
});
app.use('/static', express.static(path.resolve(__dirname, './dist')));

server.listen(3000);
