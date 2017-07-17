var http = require ('http'); 
var fs = require ('fs'); 
var qs = require('querystring');
var bikes = require('./lib/bike.js');

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
  var url = req.url.split('?');
  var params = qs.parse(url[1]);
  var path = url[0].toLowerCase();
  
  switch(path) {
    case '/':
      serveStaticFiles(res, '/public/home.html', 'text.html');
      res.end('Welcome To My Page!');
      break;
    
    case '/getall':
      var bikeList = bikes.getAll();
      var getAllMessage = (bikeList.length !== 0) ? 'Bikes by Brand: \n' + JSON.stringify(bikeList) : 'Unable to locate.';
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(getAllMessage);
      break;
    
    case '/get':
      var getBrand = bikes.get(params.brand); 
      var getMessage = (getBrand) ? JSON.stringify(getBrand) : "Not found";
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end('Results for ' + params.brand + "\n" + getMessage);
      break;
        
    case '/delete':
      var deleteBrand = bikes.get(params.brand);
      bikes.delete(params.brand);
      var newBikeList = bikes.getAll();
      var deleteMessage = (deleteBrand) ? 'Bike by Brand Deleted: ' + JSON.stringify(deleteBrand) + '\nBikes Remaining: ' + newBikeList.length : 
      'Bike not found.' + '\nBikes Remaining: ' + newBikeList.length;
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(deleteMessage);
      break;
    
    default:
      serveStaticFiles(res, '/public/404.html', 'text.html', 404);
      break;
    }
}).listen(process.env.PORT || 3000);