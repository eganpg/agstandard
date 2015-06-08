Products = new Mongo.Collection('products'); 
Orders = new Mongo.Collection('orders');
Carts = new Mongo.Collection('carts'); 
Guides = new Mongo.Collection('guides');
Meteor.startup(function(){
  $('.deliveryForm').hide();
  
})

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
        $('.deliveryForm').hide();
        return carts;
      }
      else{
        console.log('defined')
        if(cart.items == undefined){
          $('.deliveryForm').hide();
        }
        return cart;

      }
    },
    address: function(){
      console.log(Meteor.user().address);
    }
  });

  Template.hello.events({
    
    'click .add': function(e,t){
      if(!Meteor.user()){
        alert('please login');
      }
      if(Meteor.user()){
        e.preventDefault();
        var val = e.target.value;
        var quant = $('select.' + e.target.id ).val();
        this.quantity = quant;
        var cart = Carts.update({_id: val}, {$push: {items: this}})
        var currentCart = Carts.findOne({_id: val});
        console.log(currentCart);
      }
      
      
      
    },
    'click .empty': function(){
      // var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      // moltin.Authenticate();

      //  moltin.Cart.Delete();
      //  location.reload();

      
    },
    'click .remove': function(){
      var cart = Carts.findOne({userId: Meteor.userId()});
      console.log(this);

      var index = cart.items.indexOf(this);
      console.log(index);
      console.log(cart.items);
      
          cart.items.splice(index, 1);
      
      console.log(cart.items);
      Carts.update({_id: cart._id}, {items: cart.items});

      
    },
    // Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {'following': this_html}});
    'click .checkout': function(){
      var cart = Carts.findOne({userId: Meteor.userId()});
      console.log(cart.items);
      if(cart.items != undefined){
        if(Meteor.user().address == undefined){
          $('.deliveryForm').show();
        }
        else{
          // Continue with checkout
        }
      }
      else{
        alert('The Cart Seems to be Empty');
      }
    },
    'click .addressSubmit': function(){
     
      var address = $('.address').val();
      var city = $('.city').val();
      var state = $('.state').val();
      var zip = $('.zip').val();
      var addressObj = {
        address: address,
        city: city,
        state: state,
        zip: zip
      }
      Meteor.call('updateAddress', addressObj);
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

