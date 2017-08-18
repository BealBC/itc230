'use strict';
let express = require("express");
let bodyParser = require("body-parser"); 
let app = express();
let Bike = require("./models/bike");
let cors = require('cors'); 

app.set('port', process.env.PORT || 3000); 
app.use(express.static(__dirname + '/../public')); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(require("body-parser").json());
app.use(bodyParser.json()); 
app.use('/api', require("cors")()); 
app.use((err, req, res, next) => {
    console.log(err); 
});

// Set the template engine. 
let handlebars = require("express-handlebars"); 
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main'})); 
app.set("view engine", ".html");


app.get('/', (req,res) => {
    Bike.find((err, bikes) => {
        if(err)return next(err);
        res.render('home3', {bikes: JSON.stringify(bikes)});
    });
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

//APIs
app.get('/api/v1/bike/:brand', (req, res, next) => {
    let brand = req.params.brand;
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
    console.log(req.params)
    Bike.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        res.json({"deleted": result.result.n});
    });
});

app.post('/api/v1/add', (req,res, next) => {
// find & update existing item, or add new
console.log(req.body)
let brand = req.body.brand;
Bike.update({ brand: brand}, {brand: brand, model: req.body.model, size: req.body.size}, {upsert: true }, (err, result) => {
if (err) return next(err);
// nModified = 0 for new item, = 1+ for updated item
res.json({updated: result.nModified});

});

});

/*app.post('/api/v1/add/', (req,res, next) => {
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
}); */

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

// 500 handler
app.use(function (err, req, res, next) {
console.error(err.stack);
res.status(500);
res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});