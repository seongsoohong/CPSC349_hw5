var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require('./websockets-server');

var handleError = function (err, res) {
  res.writeHead(404);
  res.end();
};


var server = http.createServer(function (req, res) {
  console.log("responding to a request.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if(err) {
      fs.readFile("app/error.html", function (err, data){
        res.end(data);
      });
      return;
    } else {
      res.end(data);
    }
  });
});

server.listen(3000);
