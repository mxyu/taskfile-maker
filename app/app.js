var http = require('http');
var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);
app.use('/css', express.static(__dirname + '/css'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/build', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
	res.render('taskmaker.html');
});

var port = process.env.PORT || 8000;
app.listen(port);

console.log('app running on port ' + port);
