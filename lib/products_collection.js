var products_methods = {

	getShare: function(){
		var self = this;
		return parseFloat((Customers.find({customer_product: self.product_name}).count() / Customers.find({}).count() * 100).toFixed(2));
	},


	getUtil: function(){
		var self = this;
		var total_util = 0;
		Customers.find({}).fetch().forEach(function (customer) {
			total_util += customer.getSubjectiveUtility(self);
		});
		return parseFloat((total_util / Customers.find({}).count()).toFixed(2));
	},
};

Products = new Mongo.Collection("products", {
	transform: function(doc){

		var newInstance = Object.create(products_methods);

		return _.extend(newInstance, doc);
	}
});