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

exports.delete = (brand) => {
    var oldBikes = bikes.length; 
    var newBikes = bikes.filter((item) => {
       return item.brand !== brand;  
    });
    
    bikes = newBikes; 
    return {deleted: oldBikes !== bikes.length, total: bikes.length };
};