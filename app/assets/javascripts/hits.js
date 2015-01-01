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
            self.addFayePoint(myChart); // what about doing this in the view using the change method???
        });
    }
});

// create app
var wbNode = wbNode || {};

// Create collection
wbNode.hits = new HitCollection();

// make a view prototype
var ChartView = Backbone.View.extend({
    render: function(){
	var rendered = 'hello world i am a view';
	this.$el.html(rendered);
	return this;
    }
});

// make a copy of the view
$(document).ready(function() {
    chart = new ChartView({el: '.chartView'});
    chart.render();
});


// hold stuff

// new Highcharts.Chart({
//     chart: {
//         renderTo: this,
// 	animation: Highcharts.svg, // don't animate in old IE
//         type: 'areaspline',
//         height: 150
//     },
//     title: {
//         text: ''
//     },
//     credits: {
//         enabled: false
//     },
//     xAxis: {
//         type: 'linear',
//         tickPixelInterval: 50,
//         startOnTick: false,
//         endOnTick: false,
//         title: {
//             text: 'Seconds elapsed'
//         },
//     },
//     yAxis: {
//         title: {
//             text: 'Speed (mi/h)'
//         },
//         plotLines: [{
//             value: 0,
//             width: 1,
//             color: '#808080'
//         }]
//     },
//     plotOptions: {
//         areaspline: {
// 	    fillColor: {
//                 linearGradient: [0, 0, 0, 120],
//                 stops: [
//                     [0, '#666'],
//                     [1, '#fff']
//                 ]
//             },
//             marker: {
//                 radius: 3
//             }
//         }
//     },
//     tooltip: {
//         formatter: function () {
//             return '<b>' + this.series.name + '</b><br/>' +
//                 Highcharts.numberFormat(this.x, 0) + '<br/>' +
//                 Highcharts.numberFormat(this.y, 0);
//         }
//     },
//     legend: {
//         enabled: false
//     },
//     exporting: {
//         enabled: false
//     },
//     series: [{
//         name: 'Bike',
//         data: [ ],
//         color: '#777'
//     }]
// });
