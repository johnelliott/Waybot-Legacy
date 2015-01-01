// create app
var wbNode = wbNode || {};

// Hit Data Model: 
wbNode.Hit = Backbone.Model.extend({
    defaults: {
	time: '',
	speed: ''
    }
});

// Hits Collection:
wbNode.HitCollection = Backbone.Collection.extend({
    model: wbNode.Hit,
    url: 'http://localhost:3000/',
    sync: function(method, collection, options) {options.dataType = 'jsonp';},
    client: new Faye.Client('http://localhost:3001/hits', {
	retry: 5,
	timeout: 120
    }),
    addFayePoint: function(chartName){
	// console.log("hello from addFayePoint");
	var x = this.last().get('time');
	var y = this.last().get('speed');
	chartName.series[0].addPoint([x, y], true, this.length>20 ? true:false);
    },
    initialize: function(){
        // subscribe to counter data
        var self = this; // <- hack to refer to the collection within the subscription callback
        this.client.subscribe('/hits', function(message) {
            self.add(JSON.parse(message));
            self.addFayePoint(myChart); // what about doing this in the view using the change method??
        });
    }
});

// Create collection
wbNode.hits = new wbNode.HitCollection();

// make a view prototype
wbNode.ChartView = Backbone.View.extend({
    render: function(){
	var rendered = 'hello world i am a view';
	this.$el.html(rendered);
	return this;
    }
});

// make a copy of the view
$(document).ready(function() {
    wbNode.chart = new wbNode.ChartView({el: '.chartView'});
    wbNode.chart.render();
});
