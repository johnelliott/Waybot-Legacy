// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// Waybot-node subscriber
console.log('hello from the hits.js file in ruby');

window.client = new Faye.Client('http://localhost:3001/hits', {
    retry: 5,
    timeout: 120
});

var subscription = window.client.subscribe('/hits', function(message) {
    console.log(message);
    hits.storeHit(message, function(){
        console.log("hit stored");
    });
});
// end subscriber

// Backbone model

// Hit Data Model: 
var Hit = Backbone.Model.extend({
  defaults: {
    run_id: '',
    time: '',
    speed: ''
  }
});

// do I even need a collection?
// Run Models Collection:
var HitCollection = Backbone.Collection.extend({
  model: Hit,
  url: '/hits',
  storeHit: function(message, callback){
    var json = JSON.parse(message);
    // do some other things to save the time and speed into the model
    callback();
  }
});

// Create collection and (not a, for now) router:
var hits = new HitCollection();
//var router = new hitsRouter({collection: hits});

// Fetch collection, and then start history:
hits.fetch().then(function() {
  Backbone.history.start();
  console.log('hello from hits collection fetch callback');
});
