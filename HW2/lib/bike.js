var bikes = [
    {brand: "Raleigh", model: "Merit", size: "56"},
    {brand: "Diamondback", model: "Century", size: "58"},
    {brand: "Specialized", model: "Roubaix", size: "60"},
    {brand: "Cannondale", model: "Synapse", size: "54"},
];

exports.getAll = function() {
	return bikes;
};

exports.get = function(brand) {
    return bikes.find(function(bike) {
        return bike.brand === brand;
    });
};

exports.delete = function(brand) {
    var newBikes = bikes.filter(function(bike) {
        return bike.brand !== brand; 
    });
    
    bikes = newBikes;
};