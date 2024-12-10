import './PieChart.css'
import React from 'react'
import {Pie} from 'react-chartjs-2'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {MonthPlan} from "../../types/MonthPlan.ts";

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

type Props = {
    monthPlan: MonthPlan | undefined
}

const PieChart: React.FC<Props> = ({monthPlan}) => {
    if (!monthPlan) {
        return <p className={"loading-message"}>Loading...</p>
    }


    const data: PieChartData = {
        labels: monthPlan.categoryPlans.map(plan => plan.category), datasets: [{
            data: monthPlan.categoryPlans.map(plan => plan.categoryBudget),
            backgroundColor: ['#6DDE93', '#6DDCDE', '#6DDEBA', '#DCE1DC', '#6DB8DE'],
            borderColor: ['black', 'black', 'black', 'black'],
            borderWidth: 2,
        },],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true, plugins: {
            legend: {
                display: false,
            },
            tooltip: {enabled: false,}, datalabels: {
                display: true,
                color: 'black',
                anchor: 'end',
                align: 'start',
                formatter: (value, context) => {
                    const label = context.chart.data.labels?.[context.dataIndex];
                    return `${label}\n${value} €`;
                },
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',

            },
        },
    }

    return (<div id={"pie-chart"}>
        <Pie data={data} options={options}/>
    </div>);
};

export default PieChart;
