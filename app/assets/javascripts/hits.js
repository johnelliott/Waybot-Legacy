// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// Waybot-node subscriber
console.log('hello from the hits.js file in ruby');

window.client = new Faye.Client('http://localhost:3001/hits', {
    retry: 5,
    timeout: 120
});

////////// could this code be encapsulated within the backbone code so I only connect when I have a backbone view going?

var subscription = window.client.subscribe('/hits', function(message) {
    hits.storeHit(message);
});
// end subscriber

// Backbone model

// Hit Data Model: 
var Hit = Backbone.Model.extend({
  defaults: {
    time: '',
    speed: ''
  }
});

// do I even need a collection?
// Run Models Collection:
var HitCollection = Backbone.Collection.extend({
  model: Hit,
  url: '/',
  storeHit: function(message){
    this.add(JSON.parse(message));
  }
  // don't forget to fetch from the rails server in case this is an existing thing, and handle if it's not (i.e. a new run)
  // also don't forget to sync the data with rails when the save run is clicked
});

// Create collection and (not a, for now) router:
var hits = new HitCollection();
//var router = new hitsRouter({collection: hits});

// Fetch collection, and then start history:
hits.fetch().then(function() {
  Backbone.history.start();
});

hits.on('add', function(data){
    console.log("hit stored 2 Backbone: " + JSON.stringify(data));
});
