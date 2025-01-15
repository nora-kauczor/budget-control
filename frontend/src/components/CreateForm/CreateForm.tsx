import './CreateForm.css'
import {MonthPlan} from "../../types/MonthPlan.ts";
import axios from "axios";
import {MonthPlanDTO} from "../../types/MonthPlanDTO.ts";
import {useEffect, useRef, useState} from "react";
import {uid} from "uid";


type Props = {
    setMonthPlan: React.Dispatch<React.SetStateAction<MonthPlan>>
}

export default function CreateForm(props: Readonly<Props>) {

    const months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08",
        "09", "10", "11", "12"]
    const currentMonthNumber:number = new Date().getMonth()+1
    const currentMonth:string = currentMonthNumber>9 ? currentMonthNumber.toString() :
        "0"+currentMonthNumber.toString()
    const currentYear:number = new Date().getFullYear()
    const endYear = currentYear + 10;
    const years: string[] = [];
    for (let y: number = currentYear; y <= endYear; y++) {
        years.push(String(y))
    }
    const [monthInput, setMonthInput] = useState<string>(currentMonth)
    const [yearInput, setYearInput] = useState<string>(currentYear.toString())
    const [totalBudget, setTotalBudget] = useState<number>(0)
    const [budgetExceeded, setBudgetExceeded] = useState<boolean>(false)

    useEffect(() => {
        checkCoverage()
    }, [totalBudget]);

    function handleChangeSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;
        if (name === "month-input") {
            setMonthInput(value)
        }
        if (name === "year-input") {
            setYearInput(value)
        }
        checkCoverage()
    }


    function handleChangeTotalBudget(event: React.ChangeEvent<HTMLInputElement>){
        setTotalBudget(Number(event.target.value))
    }

    const category0Budget: any = useRef()
    const category1Budget: any = useRef()
    const category2Budget: any = useRef()
    const category3Budget: any = useRef()
    const category4Budget: any = useRef()

    function checkCoverage(): void {
        const sumOfCategoryBudgets: number = parseInt(
                category0Budget.current.value || "0" ) +
            parseInt(category1Budget.current.value || "0") +
            parseInt(category2Budget.current.value || "0") +
            parseInt(category3Budget.current.value || "0") +
            parseInt(category4Budget.current.value || "0")
        if (!budgetExceeded && sumOfCategoryBudgets > totalBudget) {
            setBudgetExceeded(true)
        }
        if (budgetExceeded && sumOfCategoryBudgets <= totalBudget) {
            setBudgetExceeded(false)
        }
    }

    function createMonthPlan(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data  = Object.fromEntries(formData);
        const newMonthPlan: MonthPlanDTO = {
            yearMonth: yearInput+"-"+monthInput,
            categoryPlanDTOs:[
                {category:data.category0Name.toString(), categoryBudget: Number(data.category0Budget)},
                {category:data.category1Name.toString(), categoryBudget: Number(data.category1Budget)},
                {category:data.category2Name.toString(), categoryBudget: Number(data.category2Budget)},
                {category:data.category3Name.toString(), categoryBudget: Number(data.category3Budget)},
                {category:data.category4Name.toString(), categoryBudget: Number(data.category4Budget)}
            ]
        }
        console.log(newMonthPlan)
        axios.post("/api/budget", newMonthPlan)
            .then(response => props.setMonthPlan(response.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }



    return (<main id={"create-form"}>
        <p>1. Pick month and year</p>
        <label htmlFor={"month-input"} className={"hidden"}>month input</label>
        <select id={"month-input"} name={"month-input"} value={monthInput} onChange={handleChangeSelection}>
            {months.map(month => <option key={uid()}>{month}</option>)}
        </select>
        <label htmlFor={"year-input"} className={"hidden"}>year input</label>
        <select id={"year-input"} name={"year-input"} value={yearInput} onChange={handleChangeSelection}>
            {years.map(year => <option key={uid()}>{year}</option>)}
        </select>
        <p>2. Set your total budget:</p>
        <label htmlFor={"total-budget-input"}>total budget
            input</label>
        <input id={"total-budget-input"} value={totalBudget}
               onChange={handleChangeTotalBudget}/>
        {budgetExceeded && <p id={"budget-exceeded"}>Total budget exceeded.</p>}
        <p>3. Split up your budget in five self-defined categories</p>
        <form onSubmit={createMonthPlan}>
            <div className={"category-wrapper"}>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category0Name"}>
                        category</label>
                    <input className={"category-name"}
                           name={"category0Name"}/>
                </div>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category0Budget"}>budget</label>
                    <input className={"category-budget"}
                           name={"category0Budget"}
                           ref={category0Budget}
                           onChange={checkCoverage}/>
                </div>
            </div>
            <div className={"category-wrapper"}>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category1Name"}>category</label>
                    <input className={"category-name"}
                           name={"category1Name"}
                    />
                </div>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category1Budget"}>budget</label>
                    <input className={"category-budget"}
                           name={"category1Budget"}
                           ref={category1Budget}
                           onChange={checkCoverage}
                    />
                </div>
                </div>
            <div className={"category-wrapper"}>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category2Name"}>category</label>
                    <input className={"category-name"}
                           name={"category2Name"}
                    /></div>
                    <div className={"input-and-label-wrapper"}>
                        <label htmlFor={"category2Budget"}>budget</label>
                        <input className={"category-budget"}
                               name={"category2Budget"}
                               ref={category2Budget}
                               onChange={checkCoverage}
                        /></div>
                    </div>
            <div className={"category-wrapper"}>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category3Name"}>category</label>
                    <input className={"category-name"}
                           name={"category3Name"}
                    /></div>
                    <div className={"input-and-label-wrapper"}>
                        <label htmlFor={"category3Budget"}>budget</label>
                        <input className={"category-budget"}
                               name={"category3Budget"}
                               ref={category3Budget}
                               onChange={checkCoverage}
                        /></div>
                    </div>
            <div className={"category-wrapper"}>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category4Name"}>category</label>
                    <input className={"category-name"}
                           name={"category4Name"}
                    /></div>
                <div className={"input-and-label-wrapper"}>
                    <label htmlFor={"category4Budget"}>budget</label>
                    <input className={"category-budget"}
                           name={"category4Budget"}
                           ref={category4Budget}
                           onChange={checkCoverage}
                    />
                </div>
                </div>
                <button type={"submit"}>Save</button>
        </form>
    </main>
)
}