import { Meteor } from 'meteor/meteor';

var crossover = function(generation){
	//console.log(generation.sort(function(a, b){return b.product_share - a.product_share}))
	for (var i = 0; i < generation.length; i++){
		var first_parent = Products.findOne({product_id: Math.floor(Math.random() * 5)});
		var second_parent = Products.findOne({product_id: Math.floor(Math.random() * 5)});
		while (first_parent.product_id == second_parent.product_id) {
			second_parent = Products.findOne({product_id: Math.floor(Math.random() * 5)});
		}
		var child_prop = [];

		//console.log(first_parent.product_id+" --- "+second_parent.product_id);

		for(var j = 0; j < 5; j++){
			var selected_parent = null;
			if(Math.random() >= 0.5){
				selected_parent = first_parent;
			}else{
				selected_parent = second_parent;
			}
			//console.log(selected_parent.product_id+" --- "+selected_parent.prop[j].prop_name);
			child_prop.push({
				prop_name: selected_parent.prop[j].prop_name,
			})
		}

		var child = Products.insert({
			product_id: Products.find({}).count()+1,
			product_name: "Prod " + Products.find({}).count(),
			product_price: 20,
			prop: child_prop,
			product_creator: "Bot",
	        product_status: "Completed",
	        product_share: 0,
		});
	}
}


var mutation = function(generation){

}


var selection = function(generation){
	var new_generation = generation.sort(function(a, b){return b.product_share - a.product_share}).slice(0, 6);
	//console.log(generation.sort(function(a, b){return b.product_share - a.product_share}).slice(0, 6));
	Products.find().fetch().forEach(function (product) {
		Products.remove(product._id);
	});

	var i = 0;

	new_generation.forEach(function (member) {
		Products.insert({
			product_id: i,
			product_name: member.product_name,
			product_price: member.product_price,
			prop: member.prop,
			product_creator: member.product_creator,
	        product_status: member.product_status,
	        product_share: member.product_share,
		});
		i++;
	});
}



Meteor.startup(() => {
  

  	Customers.find().fetch().forEach(function (customer) {
		Customers.remove(customer._id);
	});


	Products.find().fetch().forEach(function (product) {
		Products.remove(product._id);
	});


	Features.find().fetch().forEach(function (feature) {
		Features.remove(feature._id);
	});



	// Features.insert({
	// 	feature_name: "prop_1",
	// 	//time_to_achieve: 5,
	// 	//feature_price: 250,
	// 	//neccessary_employees_number: 2,
	// 	//neccessary_department: "Support",
	// 	//max_feature_level: 3,
	// 	//neccessary_level: 1,
	// });

	// Products.insert({
	// 	product_id: 1,
	// 	product_name: "Prod 1",
	// 	product_price: 8,
	// 	product_color: "orange",
	// 	//product_quality: 1 + Math.floor(Math.random() * 10),
	// 	prop: [
	// 		{prop_name: "prop_1"},
	// 		//{prop_name: "prop_2"},
	// 	],
	// 	product_quantity: 100,
	// 	product_creator: "Bot",
 //        product_status: "Completed",
 //        //product_regions: ["AF", "OR", "IN", "AS", "SP", "IN"],
	// });



	var CUSTOMERS_NUMBER = 1000;
	var FEATRUES_NUMBER = 10;
	var PRODUCTS_NUMBER = 6;



	for (var i = 0; i < FEATRUES_NUMBER; i++){
		Features.insert({
			feature_id: i,
			feature_name: "prop_"+i,
			// time_to_achieve: 10,
			// feature_price: 450,
			// neccessary_employees_number: 4,
			// neccessary_department: "Technology",
			// max_feature_level: 3,
			//neccessary_level: 1,
		});
	}



	for (var i = 0; i < PRODUCTS_NUMBER; i++){

		var prop = [];

		for(var j = 0; j < 5; j++){
			prop.push({
				prop_name: "prop_"+Math.floor(Math.random() * 9),
			})
		}


		Products.insert({
			product_id: i,
			product_name: "Prod " + i,
			//product_price: 10 + Math.floor(Math.random() * 20),
			product_price: 20,
			//product_color: "lightblue",
			prop: prop,
			product_creator: "Bot",
	        product_status: "Completed",
	        product_share: 0,
		});
	}



	for(var i = 0; i < CUSTOMERS_NUMBER; i++){

		var needed = [];

		for(var j = 0; j < 3; j++){
			needed.push({
				value: 0,
				weight: Math.floor(Math.random() * 10),  
				prop: {
					prop_0: Math.floor(Math.random() * 4),
					prop_1: Math.floor(Math.random() * 4),
					prop_2: Math.floor(Math.random() * 4),
					prop_3: Math.floor(Math.random() * 4),
					prop_4: Math.floor(Math.random() * 4),
					prop_5: Math.floor(Math.random() * 4),
					prop_6: Math.floor(Math.random() * 4),
					prop_7: Math.floor(Math.random() * 4),
					prop_8: Math.floor(Math.random() * 4),
					prop_9: Math.floor(Math.random() * 4),
				}
			})
		}

		Customers.insert({
			customer_id: i,
			//customer_region: region.region_id,
			//customer_pref: region.region_pref,
			//customer_money: 2000 + Math.floor((Math.random() * 500) + 100),
			//base_customer_conservatism: region.base_level_of_conservatism,
			//customer_conservatism: null,
			//customer_product_conservatism: {},
			customer_income: 20 + Math.floor(Math.random() * 3),
			//customer_pref: region.region_pref,
			//customer_activity: 1,
			customer_product: "",
			//customer_product_quantity: 0,
			//customer_neighbors: [],
			//customer_adv: 0,
			//customer_history: [],
			needed: needed,
		});
	}




	var interval = Meteor.setInterval(function(){

	   	console.log("-----------------------------  START  --------------------------------");

	   	var products = [];
		var features = [];
		var customers = [];

		Products.find().fetch().forEach(function (product) {
			products.push(product);
		});

		crossover(products);



	   	Customers.find({}).fetch().forEach(function (customer) {
	   		Customers.update(customer._id,{
		   		customer_id: customer.customer_id,
				customer_income: customer.customer_income,
				customer_product: customer.selectProduct(),
				needed: customer.needed,
		   	});
	   	});

	   	Customers.find().fetch().forEach(function (customer) {
			customers.push(customer);
		});

		Features.find().fetch().forEach(function (feature) {
			features.push(feature);
		});


	   	Products.find({}).fetch().forEach(function (product) {
	   		Products.update(product._id, {
				product_id: product.product_id,
				product_name: product.product_name,
				product_price: product.product_price,
				prop: product.prop,
				product_creator: product.product_creator,
		        product_status: product.product_status,
		        product_share: product.getShare(),
			});
	   	});


	   	var products = [];

	   	Products.find().fetch().forEach(function (product) {
			products.push(product);
		});


		selection(products);


	   	console.log("-----------------------------   END   --------------------------------");

	}, 10000);





});
