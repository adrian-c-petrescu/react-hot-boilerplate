var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
var fs = require('fs');
var path = require('path');
var config = require('./webpack.config');

var express = require('express');
var http = require('http');
var morgan = require('morgan');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');


var compiler = webpack(config);

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


//app.use('/static', express.static(path.resolve(__dirname, './dist')));
app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    stats: {
        colors: true
    },
    publicPath: config.output.publicPath,
    serverSideRender: false
}));
app.use(webpackHotMiddleware(compiler));

server.listen(3000);
