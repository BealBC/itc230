var Bike = require("/models/bike");

// insert a new document into the database

Bike.count((err, result)=>{
    console.log(result);
});

// find all documents 
Bike.find((err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});