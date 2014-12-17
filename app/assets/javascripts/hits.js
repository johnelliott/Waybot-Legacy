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

// Hit Models Collection:
var HitCollection = Backbone.Collection.extend({
  model: Hit,
  url: 'localhost:3001/',
  sync: function(method, collection, options) {options.dataType = 'jsonp';},
  storeHit: function(message){
    this.add(JSON.parse(message));
  }
  // don't forget to fetch from the rails server in case this is an existing thing, and handle if it's not (i.e. a new run)
  // also don't forget to sync the data with rails when the save run is clicked
});

// Create collection and (not a, for now) router:
var hits = new HitCollection();
//var router = new hitsRouter({collection: hits});

hits.on('add', function(data){
    console.log("hit stored 2 Backbone: " + JSON.stringify(data));
    chart.hello();
});

var chart = function () {
    // body...
    // Highchart test
    var init = function(){
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('.show li:first-child').highcharts({
            chart: {
                type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    // events: {
                    //     load: function () {
                    //         // page loads, then rails populates backbone,
                    //         // chart loads from backbone and renders data already in backbone
                    //         // then use an event emitter to add a point to the existing plot (not rendering each time)
                    //         var seriesdata = hits.toJSON();

                    //         series = [{
                    //             name: 'Bike data',
                    //             // data is an array: [[a,2],[b,3]]
                    //             // numbers inside json are strings and not integers  
                    //             // i need to make it DATA coming out of 
                    //             data: function () {
                    //                 console.log(hits.last().get('time'));
                    //                 console.log(hits.last().get('speed'));
                    //                 var x = hits.last().get('time');
                    //                 var y = hits.last().get('speed');
                    //                 series.addPoint([x, y], true, true);
                    //             }
                    //         }];
                    //         // // set up the updating of the chart each second
                    //         // var series = this.series[0];
                    //         // setInterval(function () {
                    //         //     var x = (new Date()).getTime(), // current time
                    //         //     y = Math.random();
                    //         //     series.addPoint([x, y], true, true);
                    //         // }, 1000);
                    //     }
                    // }
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
                }//,
                //  series: [{
                //     name: 'Random data',
                //     data: (function () {
                //         // generate an array of random data
                //         var data = [],
                //             time = (new Date()).getTime(),
                //             i;

                //         for (i = -19; i <= 0; i += 1) {
                //             data.push({
                //                 x: time + i * 1000,
                //                 y: Math.random()
                //             });
                //         }
                //         return data;
                //     }())
                // }]
        }); 
    };

    var hello = function () {
        console.log('hi randy');
    };
};
