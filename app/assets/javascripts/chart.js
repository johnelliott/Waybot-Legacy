// chart.js
// set up backbone chart

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

var chartLocation = 'waybotChart';

$(document).ready(function() {
    window.myChart = new Highcharts.Chart({
        chart: {
            renderTo: chartLocation,
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
    });
});
