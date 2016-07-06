import { Meteor } from 'meteor/meteor';

//var id = 0;

// var crossover = function(generation){
// 	//console.log(generation.sort(function(a, b){return b.product_share - a.product_share}))
// 	for (var i = 0; i < generation.length; i++){
// 		var first_parent = Products.findOne({product_id: Math.floor(Math.random() * 5)});
// 		var second_parent = Products.findOne({product_id: Math.floor(Math.random() * 5)});
// 		while (first_parent.product_id == second_parent.product_id) {
// 			second_parent = Products.findOne({product_id: Math.floor(Math.random() * 5)});
// 		}
// 		var child_prop = [];

// 		//console.log(first_parent.product_id+" --- "+second_parent.product_id);

// 		for(var j = 0; j < 6; j++){
// 			var selected_parent = null;
// 			if(Math.random() >= 0.5){
// 				selected_parent = first_parent;
// 			}else{
// 				selected_parent = second_parent;
// 			}
// 			//console.log(selected_parent.product_id+" --- "+selected_parent.prop[j].prop_name);
// 			var index = Math.floor(Math.random() * 6);
// 			while(child_prop[index]){
// 				index = Math.floor(Math.random() * 6);
// 			}
// 			child_prop.push({
// 				prop_name: selected_parent.prop[index].prop_name,
// 			})
// 		}

// 		var child = Products.insert({
// 			product_id: Products.find({}).count()+1,
// 			product_name: "Prod " + id,
// 			product_price: 20,
// 			prop: child_prop,
// 			product_creator: "Bot",
// 	        product_status: "Completed",
// 	        //product_share: 0,
// 	        product_util: 0,
// 		});
// 		id++;
// 	}
// }


// var mutation = function(generation){
// 	//console.log(generation);
// 	generation.forEach(function (member) {
// 		if(Math.random() < 0.5){
// 			var new_index = Math.floor(Math.random() * 6);
// 			var new_prop = "prop_"+Math.floor(Math.random() * 10);
// 			member.prop[new_index].prop_name = new_prop;
// 		}

// 		Products.update(member._id, {
// 			product_id: member.product_id,
// 			product_name: member.product_name,
// 			product_price: member.product_price,
// 			prop: member.prop,
// 			product_creator: member.product_creator,
// 		    product_status: member.product_status,
// 		    //product_share: member.getShare(),
// 		    product_util: member.getUtil(),
// 		});
// 	});
// }


// var selection = function(generation){
// 	//var new_generation = generation.sort(function(a, b){return b.product_share - a.product_share}).slice(0, 6);
// 	var new_generation = generation.sort(function(a, b){return b.product_util - a.product_util}).slice(0, 6);
// 	//console.log(generation.sort(function(a, b){return b.product_share - a.product_share}).slice(0, 6));
// 	Products.find().fetch().forEach(function (product) {
// 		Products.remove(product._id);
// 	});

// 	var i = 0;

// 	new_generation.forEach(function (member) {
// 		Products.insert({
// 			product_id: i,
// 			product_name: member.product_name,
// 			product_price: member.product_price,
// 			prop: member.prop,
// 			product_creator: member.product_creator,
// 	        product_status: member.product_status,
// 	        //product_share: member.product_share,
// 	        product_util: member.product_util,
// 		});
// 		i++;
// 	});
// }



Meteor.startup(() => {
  
  	//var id = 0;

 //  	Customers.find().fetch().forEach(function (customer) {
	// 	Customers.remove(customer._id);
	// });


	// Products.find().fetch().forEach(function (product) {
	// 	Products.remove(product._id);
	// });


	// Features.find().fetch().forEach(function (feature) {
	// 	Features.remove(feature._id);
	// });


	Generations.find().fetch().forEach(function (generation) {
		Generations.remove(generation._id);
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
	var FEATRUES_NUMBER = 20;
	var PRODUCTS_NUMBER = 6;

	var products = [];
	var customers = [];
	var features = [];



	for (var i = 0; i < FEATRUES_NUMBER; i++){

		features.push({
			feature_id: i,
			feature_name: "prop_"+i,
		});

		// Features.insert({
		// 	feature_id: i,
		// 	feature_name: "prop_"+i,
		// 	// time_to_achieve: 10,
		// 	// feature_price: 450,
		// 	// neccessary_employees_number: 4,
		// 	// neccessary_department: "Technology",
		// 	// max_feature_level: 3,
		// 	//neccessary_level: 1,
		// });
	}



	for (var i = 0; i < PRODUCTS_NUMBER; i++){

		var prop = [];

		for(var j = 0; j < Math.floor(Math.random() * (features.length - 10.1) + 1); j++){
			prop.push({
				prop_name: "prop_"+Math.floor(Math.random() * (features.length - 0.001)),
			})
		}

		//var product_price = Math.pow(5, prop.length);
		var product_price = 3
		if(prop.length > 0){
			product_price = 5 * prop.length;
		}


		products.push({
			product_id: i,
			product_name: "Prod " + i,
			//product_price: 10 + Math.floor(Math.random() * 20),
			product_price: product_price,
			//product_color: "lightblue",
			prop: prop,
			product_creator: "Bot",
	        product_status: "Completed",
	        //product_share: 0,
	        product_util: 0,
		});


		// Products.insert({
		// 	product_id: i,
		// 	product_name: "Prod " + id,
		// 	//product_price: 10 + Math.floor(Math.random() * 20),
		// 	product_price: 20,
		// 	//product_color: "lightblue",
		// 	prop: prop,
		// 	product_creator: "Bot",
	 //        product_status: "Completed",
	 //        //product_share: 0,
	 //        product_util: 0,
		// });
		// id++;
	}



	// products.push({
	// 	product_id: 0,
	// 	product_name: "Prod " + 0,
	// 	product_price: 30,
	// 	prop: [
	// 		{prop_name: "prop_1"}, ///21
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_3"},
	// 		{prop_name: "prop_4"},
	// 		{prop_name: "prop_5"},
	// 		{prop_name: "prop_6"},
	// 	],
	// 	product_creator: "Bot",
	//     product_status: "Completed",
	//     product_util: 0,
	// });

	// products.push({
	// 	product_id: 1,
	// 	product_name: "Prod " + 1,
	// 	product_price: 30,
	// 	prop: [
	// 		{prop_name: "prop_1"}, ///26
	// 		{prop_name: "prop_3"},
	// 		{prop_name: "prop_4"},
	// 		{prop_name: "prop_5"},
	// 		{prop_name: "prop_6"},
	// 		{prop_name: "prop_7"},
	// 	],
	// 	product_creator: "Bot",
	//     product_status: "Completed",
	//     product_util: 0,
	// });


	// products.push({
	// 	product_id: 2,
	// 	product_name: "Prod " + 2,
	// 	product_price: 30,
	// 	prop: [
	// 		{prop_name: "prop_1"}, ///31
	// 		{prop_name: "prop_4"},
	// 		{prop_name: "prop_5"},
	// 		{prop_name: "prop_6"},
	// 		{prop_name: "prop_7"},
	// 		{prop_name: "prop_8"},
	// 	],
	// 	product_creator: "Bot",
	//     product_status: "Completed",
	//     product_util: 0,
	// });


	// products.push({
	// 	product_id: 3,
	// 	product_name: "Prod " + 3,
	// 	product_price: 30,
	// 	prop: [
	// 		{prop_name: "prop_1"}, ///18
	// 		{prop_name: "prop_9"},
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_3"},
	// 		{prop_name: "prop_1"},
	// 		{prop_name: "prop_2"},
	// 	],
	// 	product_creator: "Bot",
	//     product_status: "Completed",
	//     product_util: 0,
	// });


	// products.push({
	// 	product_id: 4,
	// 	product_name: "Prod " + 4,
	// 	product_price: 30,
	// 	prop: [
	// 		{prop_name: "prop_8"}, ///31
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_4"},
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_3"},
	// 		{prop_name: "prop_2"},
	// 	],
	// 	product_creator: "Bot",
	//     product_status: "Completed",
	//     product_util: 0,
	// });


	// products.push({
	// 	product_id: 5,
	// 	product_name: "Prod " + 5,
	// 	product_price: 30,
	// 	prop: [
	// 		{prop_name: "prop_8"}, ///24
	// 		{prop_name: "prop_7"},
	// 		{prop_name: "prop_3"},
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_2"},
	// 	],
	// 	product_creator: "Bot",
	//     product_status: "Completed",
	//     product_util: 0,
	// });




	for(var i = 0; i < CUSTOMERS_NUMBER; i++){

		var needed = [];

		for(var j = 0; j < 10; j++){
			needed.push({
				value: 0,
				weight: Math.floor(Math.random() * 10),  
				//weight: 1,  
				prop: {
					// prop_0: Math.floor(Math.random() * 10),
					// prop_1: Math.floor(Math.random() * 10),
					// prop_2: Math.floor(Math.random() * 10),
					// prop_3: Math.floor(Math.random() * 10),
					// prop_4: Math.floor(Math.random() * 10),
					// prop_5: Math.floor(Math.random() * 10),
					// prop_6: Math.floor(Math.random() * 10),
					// prop_7: Math.floor(Math.random() * 10),
					// prop_8: Math.floor(Math.random() * 10),
					// prop_9: Math.floor(Math.random() * 10),
					// prop_10: Math.floor(Math.random() * 10),
					// prop_11: Math.floor(Math.random() * 10),
					// prop_12: Math.floor(Math.random() * 10),
					// prop_13: Math.floor(Math.random() * 10),
					// prop_14: Math.floor(Math.random() * 10),
					// prop_15: Math.floor(Math.random() * 10),
					// prop_16: Math.floor(Math.random() * 10),
					// prop_17: Math.floor(Math.random() * 10),
					// prop_18: Math.floor(Math.random() * 10),
					// prop_19: Math.floor(Math.random() * 10),
					prop_0: 0,
					prop_1: 1,
					prop_2: 2,
					prop_3: 3,
					prop_4: 4,
					prop_5: 5,
					prop_6: 6,
					prop_7: 7,
					prop_8: 8,
					prop_9: 9,
					prop_10: 10,
					prop_11: 11,
					prop_12: 12,
					prop_13: 13,
					prop_14: 14,
					prop_15: 15,
					prop_16: 16,
					prop_17: 17,
					prop_18: 18,
					prop_19: 19,
				}
			})
		}

		// needed = [{
		// 	value: 0,
		// 	weight: 6,   
		// 	prop: {
		// 		prop_0: 0,
		// 		prop_1: 1,
		// 		prop_2: 2,
		// 		prop_3: 3,
		// 	}
		// },{
		// 	value: 0,
		// 	weight: 3,   
		// 	prop: {
		// 		prop_0: 1,
		// 		prop_1: 2,
		// 		prop_2: 3,
		// 		prop_3: 0,
		// 	}
		// },{
		// 	value: 0,
		// 	weight: 5,   
		// 	prop: {
		// 		prop_0: 2,
		// 		prop_1: 3,
		// 		prop_2: 0,
		// 		prop_3: 1,
		// 	}
		// },{
		// 	value: 0,
		// 	weight: 4,   
		// 	prop: {
		// 		prop_0: 3,
		// 		prop_1: 0,
		// 		prop_2: 1,
		// 		prop_3: 2,
		// 	}
		// }];


		customers.push({
			customer_id: i,
			customer_income: 20 + Math.floor(Math.random() * 3),
			customer_product: "",
			needed: needed,
		});


		// Customers.insert({
		// 	customer_id: i,
		// 	//customer_region: region.region_id,
		// 	//customer_pref: region.region_pref,
		// 	//customer_money: 2000 + Math.floor((Math.random() * 500) + 100),
		// 	//base_customer_conservatism: region.base_level_of_conservatism,
		// 	//customer_conservatism: null,
		// 	//customer_product_conservatism: {},
		// 	customer_income: 20 + Math.floor(Math.random() * 3),
		// 	//customer_pref: region.region_pref,
		// 	//customer_activity: 1,
		// 	customer_product: "",
		// 	//customer_product_quantity: 0,
		// 	//customer_neighbors: [],
		// 	//customer_adv: 0,
		// 	//customer_history: [],
		// 	needed: needed,
		// });
	}


	Generations.insert({
		customers_arr: customers,
		products_arr: products,
		features_arr: features,
		generation_n: 1,
	});


	var time_count = 1;

	var interval = Meteor.setInterval(function(){
	var target_util = 0;
	//while(target_util != 162){

	   	console.log("-----------------------------  START  --------------------------------");




	   	//////////////////////////////////////////////////////////////////////////////////////////////////
	   	//////////////////////////////////////////////////////////////////////////////////////////////////
	   	//////////////////////////////////////////////////////////////////////////////////////////////////





	   	time_count++;

	   	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
	   	// var generation = Generations.find({}).fetch();
	   	// generation = generation.sort(function(a,b){return a.generation_n < b.generation_n})[0];

	   	//console.log(generation);

	   	generation.crossover();
	   	generation.mutation();
	   	generation.estimation();
	   	generation.selection();

	    //console.log(generation.products_arr);

	    generation.products_arr.forEach(function (product) {
	    	if(target_util < product.product_util){
	    		target_util = product.product_util;
	    	}
	    });

	   	Generations.insert({
	   		features_arr: generation.features_arr,
	   		customers_arr: generation.customers_arr,
	   		products_arr: generation.products_arr,
	   		generation_n: time_count,
	   	});


	 //   	if(target_util == 162){
		//     Meteor.clearInterval(interval);
		// }






	   	//////////////////////////////////////////////////////////////////////////////////////////////////
	   	//////////////////////////////////////////////////////////////////////////////////////////////////
	   	//////////////////////////////////////////////////////////////////////////////////////////////////




	 //   	var products = [];
		// // var features = [];
		// // var customers = [];

		// Products.find().fetch().forEach(function (product) {
		// 	products.push(product);
		// });

		// crossover(products);


		// var products = [];

	 //   	Products.find().fetch().forEach(function (product) {
		// 	products.push(product);
		// });

	 //   	mutation(products);



	 //   	Customers.find({}).fetch().forEach(function (customer) {
	 //   		Customers.update(customer._id,{
		//    		customer_id: customer.customer_id,
		// 		customer_income: customer.customer_income,
		// 		customer_product: customer.selectProduct(),
		// 		needed: customer.needed,
		//    	});
	 //   	});

	 // //   	Customers.find().fetch().forEach(function (customer) {
		// // 	customers.push(customer);
		// // });

		// // Features.find().fetch().forEach(function (feature) {
		// // 	features.push(feature);
		// // });


	 //   	Products.find({}).fetch().forEach(function (product) {
	 //   		Products.update(product._id, {
		// 		product_id: product.product_id,
		// 		product_name: product.product_name,
		// 		product_price: product.product_price,
		// 		prop: product.prop,
		// 		product_creator: product.product_creator,
		//         product_status: product.product_status,
		//         //product_share: product.getShare(),
		//         product_util: product.getUtil(),
		// 	});
	 //   	});


	 //   	var products = [];

	 //   	Products.find().fetch().forEach(function (product) {
		// 	products.push(product);
		// });


		// selection(products);


	   	console.log("-----------------------------   END   --------------------------------");
	//}
	}, 30000);





});
