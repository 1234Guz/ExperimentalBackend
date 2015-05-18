var products = {
	getAll: function(req, res) {
		var allProducts = data; // Spoof a DB call
		res.json(allProducts);
	},
	
	getOne: function(req, res) {
		var id = req.params.id;
		var product = data[0]; // Spoof a DB call
		res.json(product);
	},

	create: function(req, res) {
		var newProduct = req.body;
		data.push(newProduct); // Spoof a DB call
		res.json(newProduct);
	},

	update: function(req, res) {
		var updateProduct = req.body;
		var id = req.params.id;
		data[id] = updateProduct // Spoof a DB call
		res.json(updateProduct);
	},

	delete: function(req, res) {
		var id = req.params.id;
		data.splice(id, 1) // Spoof a DB call
		res.json(true);
	}
};

var data = [
	{
		name : "guz",
		email : "mamak"
	},
	{
		name : "guz",
		email : "mamak"
	},{
		name : "guz",
		email : "mamak"
	},{
		name : "guz",
		email : "mamak"
	},
]

module.exports = products;