'use strict';
var express = require("express");
var app = express();
var Bike = require("./models/bike");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public')); 
app.use(require("body-parser").urlencoded({extended: true}));
app.use('/api', require('cors')());
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
    var bikeToDelete = req.query.brand;
    
    Bike.findOne({brand:bikeToDelete}, function(err, bikeDeleted) {
        if (err) return next(err);
        
        Bike.count({}, function(err, totalBikes) { 
            if (err) return next(err);
            res.render('delete', {bikeDeleted, totalBikes, bikeToDelete});
        });
    });
});

app.get('/add', function(req, res, next) {
    var newBikeDetails = req.query; 
    var newBike = new Bike(newBikeDetails); 
    
    
    Bike.findOne({number:newBikeDetails.number}, function(err, bikeFound) {
        if (err) return next(err);
        
        var bikeExists;
        if (bikeFound) {
            bikeExists = true;
        } else {
            bikeExists = false;
        }
    
        if (!bikeExists && (newBike.brand && newBike.model)) {
            newBike.save(function(err, savedNewBike) {
                if (err) return next(err);
            
                Bike.count({}, function(err, totalBikes) {
                    if (err) return next(err);
                    res.render('add', {newBikeDetails, savedNewBike, totalBikes, bikeExists});
                });
            });   
        } else {
            res.render('add', {newBikeDetails, bikeExists});
        }
    });
});

//APIs
app.get('/api/v1/bike/:brand', (req, res, next) => {
    let brand = req.params.brand;
    console.log(brand);
    Bike.findOne({brand: brand}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/bikes', (req,res, next) => {
    Bike.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:id', (req,res, next) => {
    Bike.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        res.json({"deleted": result.result.n});
    });
});

app.post('/api/v1/add/', (req,res, next) => {
    if (!req.body._id) {
        let bike = new Bike({brand:req.body.brand,model:req.body.model,size:req.body.size});
        bike.save((err,newBike) => {
            if (err) return next(err);
            console.log(newBike);
            res.json({updated: 0, _id: newBike._id});
        });
    } else {
        Bike.updateOne({ _id: req.body._id}, {brand:req.body.brand, model: req.body.model, size: req.body.size }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/v1/add/:brand/:model/:size', (req,res, next) => {
    let brand = req.params.brand;
    Bike.update({ brand: brand}, {brand:brand, model: req.params.model, size: req.params.size }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        res.json({updated: result.nModified});
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