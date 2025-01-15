import './HomePage.css'
import PieChart from "../../components/PieChart/PieChart.tsx";
import {MonthPlan} from "../../types/MonthPlan.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    monthPlan: MonthPlan | undefined
}
export default function HomePage(props: Readonly<Props>) {
    const navigate = useNavigate()

    // TODO architektur mit unterschiedlichen forms/ wegen dorthin
    //  // und wo das zu editierende zwischengespeichert wird falls zwischengespecihert werden muss

    if (!props.monthPlan) {
        return (<main>
            <p>There is no plan for the current month, yet</p>
            <p>Go to form to create it:</p>
            <button onClick={() => navigate("/form")}>Go to form</button>
        </main>)
    }

    return (<main id={"homepage"}>
        <p>{props.monthPlan.yearMonth}</p>
        <p>{props.monthPlan.totalBudget.toFixed(2)}€
            of {props.monthPlan.totalBudget.toFixed(2)}€ left</p>
        <PieChart monthPlan={props.monthPlan}/>
        <button onClick={()=>navigate("/form")}>Edit 🖊️</button>
    </main>)

}