import './PieChart.css'
import React from 'react'
import {Pie} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions
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
        labels: [monthPlan.categoryPlans[0].category,
            monthPlan.categoryPlans[1].category,
            monthPlan.categoryPlans[2].category,
        monthPlan.categoryPlans[3].category],
        datasets: [{
            data: [monthPlan.categoryPlans[0].categoryBudget,
                monthPlan.categoryPlans[1].categoryBudget,
                monthPlan.categoryPlans[2].categoryBudget,
                monthPlan.categoryPlans[3].categoryBudget],
            backgroundColor: ['red', 'blue', 'green', 'yellow'],
            borderColor: ['darkred'],
            borderWidth: 0,
        },],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true, plugins: {
            legend: {
                display: true, position: 'top',
            }, tooltip: {enabled: false,}, datalabels: {
                display: true,
                color: 'black',
                anchor: 'end',
                align: 'start',
                formatter: (value) => `${value} €`,

            },
        },
    };


    return (<div id={"pie-chart"}>
            <Pie data={data} options={options}/>
        </div>);
};

export default PieChart;
