var http = require("http"), 
fs = require('fs');

function serveStaticFiles (res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err,data) {
    if(err) {
      res.writeHead(500, {'Content-Type' : 'text/plain' })
    } else {
      res.writeHead(responseCode, { 'Content-Type' : contentType });
      res.end(data);
    }
  });
}

http.createServer(function(req,res) {
  var path = req.url.toLowerCase();
  switch(path) {
    case '/':
      serveStaticFiles(res, '/home.html', 'text.html');
      break;
    case '/about':
      serveStaticFiles(res, '/about.html', 'text.html');
      break;
    default:
      serveStaticFiles(res, '/404.html', 'text.html', 404);
      break;
    }
}).listen(process.env.PORT || 3000);