var bikes = [
    {brand: "Raleigh", model: "Merit", size: "56"},
    {brand: "Diamondback", model: "Century", size: "58"},
    {brand: "Specialized", model: "Roubaix", size: "60"},
    {brand: "Cannondale", model: "Synapse", size: "54"},
];

exports.get = (brand) => {
    return bikes.find((item) => {
        return item.brand == brand; 
    });
}; 

exports.add = (newBike) => {
    for (var i = 0; i < bikes.length; i++) {
        if(newBike.brand == bikes[i].brand) {
            return; 
        }
    }
    
    var bikeLength = bikes.length;
    var bikeBrand = newBike.brand; 
    var bikeModel = newBike.model; 
    var bikeSize = newBike.size; 
  
    var totalBike = {brand : bikeBrand, model : bikeModel, size: bikeSize}; 
    
    bikes.push(totalBike);  
    var added = (bikes.length == bikeLength) ? "" : "added"; 
    return {"BikeAdded": added, "Total": bikes.length}; 
    
}; 

exports.delete = (brand) => {
    var oldBikes = bikes.length; 
    var newBikes = bikes.filter((item) => {
       return item.brand !== brand;  
    });
    
    bikes = newBikes; 
    return {deleted: oldBikes !== bikes.length, total: bikes.length };
};