// import './Category.css'
//
// type Props = {
//     category: string
//     budget: number
//     exceedsBudget: boolean
//     handleChangeCategoryInput: ()=> void
//     handleChangeBudgetInput: ()=> void
// }
//
// export default function Category(props: Readonly<Props>) {
//
//
//     return (<li>
//         <label className={"hidden"}>{props.category}</label>
//         <input className={"category-budget"} value={props.category} onChange={props.handleChangeCategoryInput}/>
//         <div>
//             <label className={"hidden"}>{props.budget}</label>
//             <input className={"budget-budget"} value={props.budget}
//             onChange={props.handleChangeBudgetInput}/>
//             {props.exceedsBudget && <p>Entered total exceeds budget</p>}
//         </div>
//     </li>)
// }
//
