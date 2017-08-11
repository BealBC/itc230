'use strict';
var express = require("express");
var app = express();
var Bike = require('./models/bike.js');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(require("body-parser").urlencoded({extended: true}));
app.use((err, req, res, next) => {
  console.log(err);
});

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");


app.get('/', (req,res) => {
    Bike.find((err, bikes) => {
        if(err)return next(err);
        res.render('home', {bikes: bikes});
    });
});


app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});


app.get('/get', (req,res,next) => {
    Bike.findOne({ brand:req.query.brand }, (err, bike) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: bike} ); 
    });
});


app.post('/get', (req,res, next) => {
    Bike.findOne({ brand:req.body.brand }, (err, bike) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: bike} ); 
    });
});


app.get('/delete', function(req, res, next) {
    let bikeToDelete = req.query.brand;
    
    Bike.findOne({brand:bikeToDelete}, function(err, bikeDeleted) {
        if (err) return next(err);
        
        Bike.count({}, function(err, totalBikes) { 
            if (err) return next(err);
            res.render('delete', {bikeDeleted, totalBikes, bikeToDelete});
        });
    });
});


//404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});


app.listen(app.get('port'), () => {
    console.log('Express started');    
});