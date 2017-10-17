import Promise from 'promise-polyfill'
import 'whatwg-fetch'
import Highcharts from 'highcharts/highstock'

// add Promise to window
if (!window.Promise) {
    window.Promise = Promise
}

const liveUpdateData = function liveUpdateData() {
    const chart = this
    const url = 'http://localhost:8080/values.json'
    // Get data
    fetch(url, {})
        .then((response) => {

            if (response.status >= 200 && response.status < 300) {
                return response
            }

            const error = new Error(response.statusText)
            error.response = response
            throw error


        }).then(response => response.json())
        .then((data) => {
            // Update chart
            chart.series[0].setData(data)
        })
        .catch((error) => {
            console.log('Request failed', error)
        })
}

Highcharts.stockChart('container', {
    chart: {
        events: {
            load: liveUpdateData
        },
    },
    rangeSelector: {
        selected: 1,
    },
    title: {
        text: 'Kurs-Chart',
    },
    series: [{
        name: 'AAPL',
        data: [0],
        tooltip: {
            valueDecimals: 2,
        },
    }],
})
