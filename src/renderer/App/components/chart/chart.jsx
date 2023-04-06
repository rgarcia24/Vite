import React from 'react'
import { Line } from 'react-chartjs-2'

import './chart.css'
const chart = () => {
    const data = {
        labels: ['Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],
        datasets: [
            {
                lineTension: 0.5,
                label: 'Checkouts',
                data: ['45', '80', '230', '500', '600', '400', '230', '230', '500',
                    '300', '1000', '500', '600', '700'],
                fill: true,
                backgroundColor: 'rgb(94, 64, 167, 0.2)',
                borderColor: '#5E40A7',
                pointBorderColor: '#5E40A7',
                pointBackgroundColor: '#5E40A7',
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,

        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'White',
                defaultFontFamily: 'sans-serif',
            }
        },

        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                        defaultFontFamily: 'sans-serif',

                    },
                },
            ],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    defaultFontFamily: 'sans-serif',




                }
            }]
        },
    }
    return (
        <div className='chart-div'>
            <div className='chart'>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default chart
