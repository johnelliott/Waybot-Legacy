// Hit Data Model: 
var Hit = Backbone.Model.extend({
  defaults: {
    time: '',
    speed: ''
}
});

// Hit Models Collection:
var HitCollection = Backbone.Collection.extend({
  model: Hit,
  url: 'http://localhost:3000/',
  sync: function(method, collection, options) {options.dataType = 'jsonp';},
  client: new Faye.Client('http://localhost:3001/hits', {
      retry: 5,
      timeout: 120
  }),
  initialize: function(){
        // subscribe to counter data
        var self = this; // this is a hack to get this to refer to the collection within the subscription callback
        this.client.subscribe('/hits', function(message) {
            self.add(JSON.parse(message));
            // console.log('hello form the faye callback ' + message);
            // addFayePoint();
        });
    }
});

// Create collection
var hits = new HitCollection();

function addFayePoint(chartName){
    console.log("hello from addFayePOint");
    var x = hits.last().get('time');
    var y = hits.last().get('speed');
    chartName.series[0].addPoint([x, y], true, true);
}
