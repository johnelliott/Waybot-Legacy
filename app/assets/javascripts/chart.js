// chart.js

// set up backbone chart
Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

var chartLocation = 'container';
$(document).ready(function() {
    window.myChart = new Highcharts.Chart({
        chart: {
            renderTo: chartLocation,
            type: 'column',
            //,
            // events: {
            //     load: function () {
            //         // set up the updating of the chart each second                      
            //         var series = this.series[0];
            //         var faketime =0;
            //         setInterval(function(){
            //             faketime += 2;
            //             // series.addpoint([Math.floor(faketime), Math.floor(Math.random()*30) ]);
            //             series.addpoint({ x: Math.floor(faketime), y: Math.floor(Math.random()*30) });
            //         }, 1200);
            //     },
            //     add: function(){ console.log('the add functino works'); }
            // }
            },
            title: {
                    text: 'Live bike data'
            },
            xAxis: {
                type: 'linear',
                tickPixelInterval: 50
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
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false
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
            data: [ ]
        }]
    });
});

