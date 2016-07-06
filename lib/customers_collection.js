var customers_methods = {
	selectProduct: function(){
		var self = this;
		var new_product = null;
		var products = [];
		var value_for_money = 0;
		var new_product_value = 0;
		var CONSERVATISM_SCALE = 1;

		Products.find({}).fetch().forEach(function (product) {
			if(product.product_price <= self.customer_income && product.product_status == "Completed"){
				// product.product_regions.forEach(function (region) {
				// 	if(region == self.customer_region){
						products.push(product);
				// 	}
				// });
			}
		});
		products = products.sort();
		//console.log(new_product);
		if(products[0]){
			products.forEach(function (product) {
				var product_value = self.getSubjectiveUtility(product);
				// console.log('--------------------------------------------------------');
				// console.log(product_value+" # "+value_for_money);
				/////// IMPORTANT Graph dependency /////////
				//product_value = self.getNeighborsOpinion(game, product_value, product);
				/////// IMPORTANT Customer Conservatism ////
				//product_value = product_value * (CONSERVATISM_SCALE - self.customer_product_conservatism[product.product_id]);
				////////////////////////////////////////////
				product_value =  product_value / product.product_price;
				// console.log(product_value+" # "+value_for_money);
				// console.log('--------------------------------------------------------');
				if(product_value > value_for_money){
					new_product = product;
					value_for_money = product_value;
				}
			});
		}
		// console.log(new_product);
		// console.log(new_product_value);
		// console.log(self.customer_pref);
		if(value_for_money <= self.customer_pref){
			new_product = null;
		}

		if (new_product){
			// var output = {
			//	new_product: new_product,
			//};
			//console.log(new_product.product_name);
			return new_product.product_name;
		}else{
			// var output = {
			// };
			//console.log(output);
			//return output;
		}
	},


	getSubjectiveUtility: function (product){
		var self = this;
		var sub_util = 0;
		self.needed.forEach(function (need) {
			product.prop.forEach(function (prop) {
				sub_util += need.prop[prop.prop_name] * need.weight;
			});
		});
		return sub_util;
	},
};

Customers = new Mongo.Collection("customers", {
	transform: function(doc){

		var newInstance = Object.create(customers_methods);

		return _.extend(newInstance, doc);
	}
});