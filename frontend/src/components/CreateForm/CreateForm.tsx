import {MonthPlan} from "../../types/MonthPlan.ts";
import axios from "axios";
import {MonthPlanDTO} from "../../types/MonthPlanDTO.ts";
import { useRef, useState} from "react";
import {uid} from "uid";


type Props = {
    setMonthPlan: React.Dispatch<React.SetStateAction<MonthPlan>>
}

export default function CreateForm(props: Readonly<Props>) {
    const [monthInput, setMonthInput] = useState<string>("")
    const [yearInput, setYearInput] = useState<string>("")
    const [totalBudget, setTotalBudget] = useState<number>(0)
    const [budgetExceeded, setBudgetExceeded] = useState<boolean>(false)

    function handleChangeSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const source = event.target.name;
        const data = new InputEvent(event.target.value);
        const value: string = data.type;
        if (source === "month-input") {
            setMonthInput(value)
        }
        if (source === "year-input") {
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
        console.log("check coverage was called")
        const sumOfCategoryBudgets: number = parseInt(
                category0Budget.current.value) +
            parseInt(category1Budget.current.value) +
            parseInt(category2Budget.current.value) +
            parseInt(category3Budget.current.value) +
            parseInt(category4Budget.current.value)
        console.log("sumOfCategoryBudgets: ", sumOfCategoryBudgets)
        if (!budgetExceeded && sumOfCategoryBudgets > totalBudget) {
            setBudgetExceeded(true)
        }
        if (budgetExceeded && sumOfCategoryBudgets <= totalBudget) {
            setBudgetExceeded(false)
        }
    }

    function createMonthPlan(event: React.ChangeEvent<HTMLFormElement>) {
        const data: any = event.target.value;
        console.log(data)
        // const newMonthPlan: MonthPlanDTO = {
        //     yearMonth: yearInput+" "+monthInput,
        // }
        // axios.put("/api/budget", newMonthPlan)
        //     .then(response => props.setMonthPlan(response.data))
        //     .catch((error) => {
        //         console.error("Error fetching data:", error);
        //     })
    }

    const months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08",
        "09", "10", "11", "12"]
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 10;
    const years: string[] = [];
    for (let y: number = currentYear; y <= endYear; y++) {
        years.push(String(y))
    }

    return (<main>
        <p>Pick month and year</p>
        <label className={"hidden"} htmlFor={"month-input"}>month input</label>
        <select id={"month-input"} value={monthInput} onChange={handleChangeSelection}>
            {months.map(month => <option key={uid()}>{month}</option>)}
        </select>
        <label className={"hidden"} htmlFor={"year-input"}>year input</label>
        <select id={"year-input"} value={yearInput} onChange={handleChangeSelection}>
            {years.map(year => <option key={uid()}>{year}</option>)}
        </select>
        <p>Set your total budget:</p>
        <label className={"hidden"} htmlFor={"total-budget-input"}>total budget
            input</label>
        <input id={"total-budget-input"} value={totalBudget}
               onChange={handleChangeTotalBudget}/>
        {budgetExceeded && <p>Total budget exceeded</p>}
        <form onSubmit={createMonthPlan}>
            <div className={"category-wrapper"}>
                <label className={"hidden"} htmlFor={"category0-name"}>Name
                    of category 0</label>
                <input className={"category0-name"}
                       name={"category0-name"}/>
                <label className={"hidden"} htmlFor={"category0-budget"}>Budget
                    of category 0</label>
                <input className={"category-budget"}
                       name={"category0-budget"}
                       ref={category0Budget}
                       onChange={checkCoverage}/>
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"} htmlFor={"category1-name"}>Name
                    of category 1</label>
                <input className={"category-name"}
                       name={"category1-name"}
                />
                <label className={"hidden"} htmlFor={"category1-budget"}>Budget
                    of category 1</label>
                <input className={"category-budget"}
                       name={"category1-budget"}
                       ref={category1Budget}
                       onChange={checkCoverage}
                />
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"} htmlFor={"category2-name"}>Name
                    of category 2</label>
                <input className={"category-name"}
                       name={"category2-name"}
                />
                <label className={"hidden"} htmlFor={"category2-budget"}>Budget
                    of category 2</label>
                <input className={"category-budget"}
                       name={"category2-budget"}
                       ref={category2Budget}
                       onChange={checkCoverage}
                />
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"} htmlFor={"category3-name"}>Name
                    of category 3</label>
                <input className={"category-name"}
                       name={"category3-name"}
                />
                <label className={"hidden"} htmlFor={"category3-budget"}>Budget
                    of category 3</label>
                <input className={"category-budget"}
                       name={"category3-budget"}
                       ref={category3Budget}
                       onChange={checkCoverage}
                />
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"} htmlFor={"category4-name"}>Name
                    of category 4</label>
                <input className={"category-name"}
                       name={"category4-name"}
                />
                <label className={"hidden"} htmlFor={"category4-budget"}>Budget
                    of category 4</label>
                <input className={"category-budget"}
                       name={"category4-budget"}
                       ref={category4Budget}
                       onChange={checkCoverage}
                />

            </div>
            <button type={"submit"}>Save changes</button>
        </form>

    </main>)
}