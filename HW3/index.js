'use strict';
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");
  
var bikes = require('./lib/bike.js');

app.get('/', function(req,res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
});

app.post('/get', function(req, res){
    console.log(req.body);
    var getBrand = bikes.get(req.body.brand); 
    res.render("details", {brand: req.body.brand, result: getBrand}); 
}); 

app.get('/delete', function(req,res){
    var result = bikes.delete(req.query.brand); 
    res.render('delete', {brand: req.body.brand, result: result});
}); 

app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started'); 
});