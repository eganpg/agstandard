if (Meteor.isClient) {
  // counter starts at 0
 
  

  Template.hello.helpers({
    list: function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();
      var product = moltin.Product.List({status: 1});
        return product;
    },
    cartSize: function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();
      console.log(moltin);
      return moltin.Cart.Contents();

        


    }
  });

  Template.hello.events({
    'click .add': function(){
      console.log(this)
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();
      moltin.Cart.Insert(this.id, '1', null, function(cart) {
          console.log(cart);
          location.reload();
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
    'click .checkout': function(){
      var moltin = new Moltin({publicId: 'PJhJh8SAkrZD27vQmpSXyDVC5VpBVfbhG486apa2'});    
      
      moltin.Authenticate();

      console.log(moltin.Cart.Checkout());
    }
  })

}
