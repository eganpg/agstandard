Products = new Mongo.Collection('products'); 
Orders = new Mongo.Collection('orders');
Carts = new Mongo.Collection('carts'); 
Guides = new Mongo.Collection('guides');
Houston.add_collection(Products);
Houston.add_collection(Orders);
Houston.add_collection(Carts);
Houston.add_collection(Guides);
Houston.add_collection(Meteor.users)

Meteor.methods({
	updateAddress: function(addressObj){
		Meteor.users.update({_id: Meteor.userId()}, {$set:{address: addressObj}});
	}
})