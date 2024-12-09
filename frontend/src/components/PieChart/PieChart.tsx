import './PieChart.css'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

interface PieChartData {
    labels: string[]
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

const PieChart: React.FC = () => {
const label:string = "label 5"

    const data: PieChartData = {
        labels: ['Series A', 'Series B', 'Series C', 'test', label],
        datasets: [
            {
                data: [10, 20, 5, 15, 5],
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'darkred'],
                borderColor: ['darkred'],
                borderWidth: 0,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: { enabled: false, },
            datalabels: {
                display: true,
                color: 'black',
                anchor: 'end',
                align: 'start',
                formatter: (value) => `${value} €`, // Zeigt Werte auf den Kuchenteilen
            },
        },
    };

    return (
        <div id={"pie-chart"}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
