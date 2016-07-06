import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.body.onCreated(function() {
    var self = this;
    // Tracker.autorun(function (c) {
    //     self.generation = Generations.findOne({}, {sort: {generation_n: -1}});
    //     //console.log("Now i am here");
    //     self.c = c;
        var generation_subscription = self.subscribe("generations");
        if(generation_subscription.ready()){
			console.log('Loaded!');
        }else{
            console.log('Loading...');
        }
    // });

    self.getGeneration = function(){
        return Generations.findOne({}, {sort: {generation_n: -1}});
    }
});


Template.body.helpers({
  all_products() {
  	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
    if(generation){
    	return generation.products_arr;
    }
  },
});


Template.customers_stat.helpers({
  customers_number(){
  	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
  	if(generation){
    	return generation.customers_arr.length;
    }
  },

  generation_n(){
	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
	if(generation){
    	return generation.generation_n;
    }
  },

  // product_share(){
  // 	return this.getShare();
  // },

  // product_util(){
  // 	return this.product_util;
  // },

  // share_sum(){
  // 	var count = 0;
  // 	Products.find().fetch().forEach(function (product) {
  // 		count += product.getShare();
  // 	});
  // 	return parseFloat(count.toFixed(2));
  // },
});




// Template.body.onDestroyed(function() {
//     var self = this;
//     self.c.stop();
// });
