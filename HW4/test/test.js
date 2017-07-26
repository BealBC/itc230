'use strict';

var expect = require("chai").expect;
var bikes = require("../lib/bike");

describe("Bicycle Module Test", () => {
//Test 1
it("returns requested bike", function() {
        var result = bikes.get('Raleigh');
        expect(result).to.deep.equal({ brand:'Raleigh', model:'Merit', size:'56'});
});
 
//Test 2
it("fails w/ invalid bike", function() {
        var result = bikes.get("fake");
        expect(result).to.be.undefined;
});

//Test 3
it("adds requested bicycle info", function(){
        var newBike = {brand: "Bianchi", model: "Intrepida", size: 62};
        var result = bikes.add(newBike);
        expect(result).to.deep.equal({"BikeAdded": "added", "Total": 5});
    });
  
//Test4    
it("add fails", function(){
        var result = bikes.add({brand: "Huffy", model: "HuffyPuffy", size: 68});
        expect(result).to.be.isUndefined; 
});

//Test 5
it("deletes bicycle info", function(){
        var result = bikes.delete("Specialized");
        expect(result).to.deep.equal({"deleted": true, "total": 5});
    });

//Test 6
it("unable to delete brand", function(){
        var result = bikes.delete("ReallyNotReal");
        expect(result).to.deep.equal({"deleted": false, "total": 5});
    });    

});