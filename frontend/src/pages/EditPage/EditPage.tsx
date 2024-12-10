// import './EditPage.css'
// import Category from "../../components/Category/Category.tsx";
// import {MonthPlan} from "../../types/MonthPlan.ts";
// import {useEffect, useEffect, useId, useState} from "react";
//
//
// type Props = {
//     monthPlan:MonthPlan
// }
// export default function EditPage(props: Readonly<Props>) {
//     // Wenn Summe von Katgeorie geändert wird: prüfe ob noch genug im total ist
// const [totalInput, setTotalInput]=useState(props.monthPlan.totalBudget);
//
// function handleChangeTotalInput(event: React.ChangeEvent<HTMLInputElement>){
//
// }
// function handleChangeCategoryInput(event: React.ChangeEvent<HTMLInputElement>){
// //     const source = event.target.name
// // const category:string = new InputEvent(event.target.value)
// //     const value = data.type
//     // TODO: von welcher  id kam der input
//     // TODO und was ist der value
// }
//
// function handleChangeBudgetInput(){
//
// }
//
//     return (<main>
//         <form>
//             <div><label>Total</label><input
//                 className={"budget-input"} value={totalInput} onChange={handleChangeTotalInput}/></div>
//             <Category
//                 id={useId()}
//                 handleChangeCategoryInput={handleChangeCategoryInput}
//                 handleChangeBudgetInput={handleChangeBudgetInput}
//             category={props.monthPlan.categoryPlans[0]}
//             budget={props.monthPlan.categoryPlans[0].categoryBudget}/>
//             <button>add another category</button>
//         </form>
//     </main>)
// }