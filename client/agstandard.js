Products = new Mongo.Collection('products'); 
Orders = new Mongo.Collection('orders');
Carts = new Mongo.Collection('carts'); 
Guides = new Mongo.Collection('guides');

  Template.hello.helpers({
    product: function(){
      var product = Products.find({});
      return product;
    },
    cart: function(){
      var cart = Carts.findOne({userId: Meteor.userId()});
      if(cart == undefined){
        var carts = Carts.insert({userId: Meteor.userId()});
        console.log('cart is undefined');

        return carts;
      }
      else{
        console.log('defined')
        console.log(cart);
        return cart.items

      }
      
    }
    // list: function(){
    //   var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
    //   moltin.Authenticate();
    //   var product = moltin.Product.List({status: 1});
    //   console.log(product)
    //     return product;
    // },
    // cartSize: function(){
    //   var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
    //   moltin.Authenticate();
    //   var contents =  moltin.Cart.Contents();
    //   console.log(contents)
      
    //   var arr = Object.keys(contents.contents).map(function(key){return contents.contents[key]});
    //   console.log(arr);
    //   return arr;
    // }
  });

  Template.hello.events({
    'click .add': function(e,t){
      if(!Meteor.user){
        alert('please login');
      }
      if(Meteor.user){
        
        var val = e.target.value;

        var cart = Carts.update({_id: val}, {$push: {items: this}})
        var currentCart = Carts.findOne({_id: val});
        console.log(currentCart);
      }
      // console.log(this)
      // var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      // moltin.Authenticate();
      // moltin.Cart.Insert(this.id, '1', null, function(cart) {
      //     console.log(cart);
      //     // location.reload();
      // }, function(error) {
      //     // Something went wrong...
      // });
      
      
    },
    'click .empty': function(){
      // var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      // moltin.Authenticate();

      //  moltin.Cart.Delete();
      //  location.reload();

      
    },
    'click .remove': function(){
      // var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      // moltin.Authenticate();
      // console.log(this);
      // moltin.Cart.Remove(this.id, function() {
      //    console.log('great')
      // }, function(error) {
      //     console.log(error);
      // });
      //  // location.reload();

      
    },
    'click .checkout': function(){
      // var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      // moltin.Authenticate();

      // console.log(moltin.Cart.Checkout());
    },
    'click .submit': function(){
      var productName = $('.productname').val();
      var productPrice = $('.productprice').val();
      var productDescription = $('.productdescription').val();
      var productQuantity = $('.productquantity').val();
      var imageUrl = $('.imageurl').val();
      var unitDescription = $('.unitdescription').val();
      console.log(productName);
      Products.insert({productName: productName, productPrice: productPrice, productDescription: productDescription, productQuantity: productQuantity, imageUrl: imageUrl, unitDescription: unitDescription})
    }

  })



Template.hello.rendered = function () {
  // @see: http://stackoverflow.com/questions/5284814/jquery-scroll-to-div
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
    return true;
  });
  $('.catagory').click(function(){
     var catagory = $('.catagory').value();
      console.log(catagory);
  });
  $('.down_arrow').click(function(){
    $('.productContainer').goTo();
  });
  $('.up_arrow').click(function(){
    $("html, body").animate({ scrollTop: "-500px" });
  });
  $('.up_arrow_mobile').click(function(){
    $("html, body").animate({ scrollTop: "-500px" });
  });
   $('.click_above').click(function(){
    $("html, body").animate({ scrollTop: "-500px" });
  });
 
  (function($) {
      $.fn.goTo = function() {
          $('html, body').animate({
              scrollTop: $(this).offset().top + 'px'
          }, 'slow');
          return this; // for chaining...
      }
  })(jQuery);
   (function($) {
      $.fn.goUp = function() {
          $('html, body').animate({
              scrollTop: $(this).offset().bottom + 'px'
          }, 'slow');
          return this; // for chaining...
      }
  })(jQuery);

  }

