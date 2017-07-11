var books = [
	{title : 'Book1' , rating : 5, price : 20},
	{title : 'Book2' , rating : 4, price : 15},
	{title : 'Book3' , rating : 3, price : 25},
	{title : 'Book4' , rating : 2, price : 10}
];

exports.getBooks = function() {
	var Books = books.length;
	return books[Books];
}