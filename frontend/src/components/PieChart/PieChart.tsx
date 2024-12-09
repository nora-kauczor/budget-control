import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

const PieChart: React.FC = () => {

    const data: PieChartData = {
        labels: ['Series A', 'Series B', 'Series C'],
        datasets: [
            {
                data: [10, 15, 20],
                backgroundColor: ['red', 'blue', 'green'],
                borderColor: ['darkred', 'darkblue', 'darkgreen'],
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
