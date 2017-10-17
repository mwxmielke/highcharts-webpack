import Promise from 'promise-polyfill'
import 'whatwg-fetch'
import Highcharts from 'highcharts/highstock'

// add Promise to window
if (!window.Promise) {
    window.Promise = Promise
}

const config = {
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
}

class StockChart {
    constructor(id, url) {
        this.url = url
        this.chart = this.initChart(id)
    }

    initChart(id) {
        return Highcharts.stockChart(id, {
            ...config,
            chart: {
                events: {
                    load: this.updateData(),
                },
            },
        })
    }

    updateData() {
        // Get data
        fetch(this.url, {})
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
                this.chart.series[0].setData(data)
            })
            .catch((error) => {
                console.log('Request failed', error) // eslint-disable-line no-console
            })
    }
}

const stockChart = new StockChart('container', 'http://localhost:8080/values.json') // eslint-disable-line no-unused-vars
