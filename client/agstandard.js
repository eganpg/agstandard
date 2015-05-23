if (Meteor.isClient) {
  // counter starts at 0
 
  

  Template.hello.helpers({
    list: function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();
      var product = moltin.Product.List({status: 1});
      console.log(product)
        return product;
    },
    cartSize: function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      moltin.Authenticate();
      var contents =  moltin.Cart.Contents();
      console.log(contents)
      
      var arr = Object.keys(contents.contents).map(function(key){return contents.contents[key]});
      console.log(arr);
      return arr;

        


    }
  });

  Template.hello.events({
    'click .add': function(){
      console.log(this)
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();
      moltin.Cart.Insert(this.id, '1', null, function(cart) {
          console.log(cart);
          // location.reload();
      }, function(error) {
          // Something went wrong...
      });
      
      
    },
    'click .empty': function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();

       moltin.Cart.Delete();
       location.reload();

      
    },
    'click .remove': function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();
      console.log(this);
      moltin.Cart.Remove(this.id, function() {
         console.log('great')
      }, function(error) {
          console.log(error);
      });
       // location.reload();

      
    },
    'click .checkout': function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();

      console.log(moltin.Cart.Checkout());
    }
  })

}
