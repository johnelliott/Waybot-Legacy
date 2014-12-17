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
  subscribe: function(){},
  initialize: function(){
        // set up backbone chart
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

      //   var client = new Faye.Client('http://localhost:3001/hits', {
      //     retry: 5,
      //     timeout: 120
      // });
        var self = this;
        this.client.subscribe('/hits', function(message) {
            console.log(message); // this event isn't firing
            self.add(JSON.parse(message));
            console.log(this);
        });
    }

}
);

// Create collection
var hits = new HitCollection();

var ChartView = Backbone.View.extend({
    el: '.show li:first-child',
    collection: hits,
    events: {
        'add': function(){
            console.log("hit stored");
            var x = hits.last().get('time');
            var y = hits.last().get('speed');
            this.chart.series.addPoint([x, y], true, true);
        }
    },
    init: function(){
        this.$el.highcharts({
            chart: {
                type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                        load: function () {
                            // page loads, then rails populates backbone,
                            // chart loads from backbone and renders data already in backbone
                            // then use an event emitter to add a point to the existing plot (not rendering each time)
                            series = [{
                                name: 'Bike data',
                                data: [0,0]
                                // data is an array: [[a,2],[b,3]]
                                // numbers inside json are strings and not integers  
                                // i need to make it DATA coming out of 
                                // data: function () {
                                //     console.log(hits.last().get('time'));
                                //     console.log(hits.last().get('speed'));
                                //     var x = hits.last().get('time');
                                //     var y = hits.last().get('speed');
                                //     series.addPoint([x, y], true, true);
                                // }
                            }];
                            // // set up the updating of the chart each second
                            // var series = this.series[0];
                            // setInterval(function () {
                            //     var x = (new Date()).getTime(), // current time
                            //     y = Math.random();
                            //     series.addPoint([x, y], true, true);
                            // }, 1000);
}
}
},
title: {
    text: 'Run progress'
},
xAxis: {
    type: 'linear',
    tickPixelInterval: 150
},
yAxis: {
    title: {
        text: 'Speed'
    },
    plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
    }],
    labels: {
        formatter: function() {
            return this.value + ' MPH';
        }
    }
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
}
});
}
});

var chartView = new ChartView();

