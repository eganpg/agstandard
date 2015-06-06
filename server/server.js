Products = new Mongo.Collection('products'); 
Orders = new Mongo.Collection('orders');
Carts = new Mongo.Collection('carts'); 
Guides = new Mongo.Collection('guides');
Houston.add_collection(Products);
Houston.add_collection(Orders);
Houston.add_collection(Carts);
Houston.add_collection(Guides);