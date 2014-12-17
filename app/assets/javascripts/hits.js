// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
console.log('hello from the hits.js file in ruby');

// // Waybot-node subscriber
// window.client = new Faye.Client('http://localhost:3001/hits', {
//     retry: 5,
//     timeout: 120
// });

// var subscription = window.client.subscribe('/hits', function(message) {
//     hits.storeHit(message);
//     chart.update();
// });
// end subscriber

// Backbone model



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
        // set up backbone chart
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        // subscribe to counter data
        var self = this; // this is a hack to get this to refer to the collection within the subscription callback
        this.client.subscribe('/hits', function(message) {
            self.add(JSON.parse(message));
        });
    }
});

// Create collection
var hits = new HitCollection();

var ChartView = Backbone.View.extend({
    el: '.show li:first-child',
    collection: hits,
    events: {
        'add': 'addPoint'
    },
    chart: {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
    },
    addPoint: function(){
        console.log("hit stored");
        var x = hits.last().get('time');
        var y = hits.last().get('speed');
        this.$el.chart.series.addPoint([x, y], true, true);
    }, 
    init: function(){
        this.$el.highcharts(chart);
    }
});

var chartView = new ChartView();
