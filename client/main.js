import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.products.helpers({
  products() {
    return Products.find();
  },
});


Template.customers_stat.helpers({
  products() {
    return Products.find();
  },

  customers_number(){
	return Customers.find({}).count();
  },

  product_share(){
  	return this.getShare();
  }
});

