var products_methods = {

	getShare: function(){
		var self = this;
		return parseFloat((Customers.find({customer_product: self.product_name}).count() / Customers.find({}).count() * 100).toFixed(2));
	},
};

Products = new Mongo.Collection("products", {
	transform: function(doc){

		var newInstance = Object.create(products_methods);

		return _.extend(newInstance, doc);
	}
});