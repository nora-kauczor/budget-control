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

    function getAllFractions(): number[] {
        return monthPlan.categoryPlans.flatMap(plan => {
            const amountSpent: number = plan.categoryBudget -
                plan.categoryLeftover;
            return [plan.categoryLeftover.toFixed(2), amountSpent.toFixed(2)]
        })
    }

    function getAllLables():string[]{
       return monthPlan.categoryPlans.flatMap(plan => [plan.category+" (left)", plan.category+" (spent)"])
    }
    console.log(getAllFractions())

    const data: PieChartData = {
        labels: getAllLables(),
        datasets: [{
            data: getAllFractions(),
            backgroundColor: ['#6DDE93', 'darkgray', '#6DDCDE', 'darkgray',
                '#6DDEBA', 'darkgray', '#DCE1DC', 'darkgray', '#6DB8DE',
                'darkgray'],
            borderColor: ['black', 'darkgray','black', 'darkgray','black', 'darkgray','black','darkgray'],
            borderWidth: 2,
        },],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true, plugins: {
            legend: {
                display: false,
            }, tooltip: {enabled: false,}, datalabels: {
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
