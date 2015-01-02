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
            self.addFayePoint(wbNode.chartView.highchart); // what about doing this in the view using the change method??
        });
    }
});

// Create collection
wbNode.hits = new wbNode.HitCollection();

// make a view prototype
wbNode.ChartView = Backbone.View.extend({
    chartOptions: {
        chart: {
            renderTo: 'waybotChart',
            animation: Highcharts.svg, // don't animate in old IE
            type: 'areaspline',
            height: 150
	},
	title: {
            text: ''
	},
	credits: {
            enabled: false
	},
	xAxis: {
            type: 'linear',
            tickPixelInterval: 50,
            startOnTick: false,
            endOnTick: false,
            title: {
		text: 'Seconds elapsed'
            },
	},
	yAxis: {
            title: {
		text: 'Speed (mi/h)'
            },
            plotLines: [{
		value: 0,
		width: 1,
		color: '#808080'
            }]
	},
	plotOptions: {
            areaspline: {
		fillColor: {
                    linearGradient: [0, 0, 0, 120],
                    stops: [
			[0, '#666'],
			[1, '#fff']
                    ]
		},
		marker: {
                    radius: 3
		}
            }
	},
	tooltip: {
            formatter: function () {
		return '<b>' + this.series.name + '</b><br/>' +
		    Highcharts.numberFormat(this.x, 0) + '<br/>' +
		    Highcharts.numberFormat(this.y, 0);
            }
	},
	legend: {
            enabled: false
	},
	exporting: {
            enabled: false
	},
	series: [{
            name: 'Bike',
            data: [ ],
            color: '#777'
	}]
    },
    render: function(){
	this.$el.html('<div id="waybotChart"></div>');
	this.highchart = new Highcharts.Chart(this.chartOptions);
	return this;
    }
});

// make a copy of the view
$(document).ready(function() {
    wbNode.chartView = new wbNode.ChartView({el: '.chartView'});
    wbNode.chartView.render();
});
