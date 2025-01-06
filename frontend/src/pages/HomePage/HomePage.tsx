import './HomePage.css'
import PieChart from "../../components/PieChart/PieChart.tsx";
import {MonthPlan} from "../../types/MonthPlan.ts";

type Props = {
    monthPlan: MonthPlan | undefined
}
export default function HomePage(props: Readonly<Props>) {
    if (!props.monthPlan) {
        return <p className={"loading-message"}>Loading...</p>
    }

    return (<main id={"homepage"}>
        <p>{props.monthPlan.yearMonth}</p>
        <p>{props.monthPlan.totalBudget.toFixed(2)}€ of {props.monthPlan.totalBudget.toFixed(2)}€ left</p>
        <PieChart monthPlan={props.monthPlan}/>
    </main>)

}