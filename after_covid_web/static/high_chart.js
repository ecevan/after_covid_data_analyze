// Create the chart
    Highcharts.stockChart('sp500-container', {
      rangeSelector: {
        selected: 6
      },
      title: {
        text: 'S&P500 Index'
      },
      xAxis: {
        plotLines: [plot_lines]
      },
      series: [
        sp500_data, {
        // Add a scatter series to display the flashing marker
        type: 'scatter',
        name: 'Flashing',
        data: [last_data],
        marker: {
          radius: 5, // Set the radius to 10
          fillColor: '#23395d',
          lineColor: '#bcd2e8',
          lineWidth: 2,
          states: {
            hover: {
              enabled: false
            },
            select: {
              enabled: false
            },
        // Set the marker states for the flashing effect
          flashing: {
            enabled: true,
            lineWidthPlus: 10,
            marker: {
              enabled: true,
              radius: 12,
              fillColor: '#23395d',
              lineColor: '#bcd2e8',
              lineWidth: 3,
              states: {
                hover: {
                  enabled: false
                },
                select: {
                  enabled: false
                }
              }
            }
          }
          }
        }
      }]
    });
// Toggle the flashing effect on the last data point every 500 milliseconds
setInterval(function() {
  var chart = Highcharts.charts[0];
  var series = chart.series[1];
  var lastPoint = series.data[0];
  if (lastPoint.state === 'flashing') {
    lastPoint.setState('');
  } else {
    lastPoint.setState('flashing');
  }
}, 1500);

// Calculate the number of days since the COVID-19 outbreak
var outbreakDate = new Date("January 31, 2020"); // Replace with the actual outbreak date
var currentDate = new Date();
var timeDiff = Math.abs(currentDate.getTime() - outbreakDate.getTime());
var daysSinceOutbreak = Math.ceil(timeDiff / (1000 * 3600 * 24));

// Update the element with the number of days with anime
const numberElement = document.getElementById("daysSinceOutbreak");
anime({
    targets: numberElement,
    innerHTML: [0, daysSinceOutbreak],
    round: 1,
    duration: 3500,
    easing: 'easeInOutExpo'
});