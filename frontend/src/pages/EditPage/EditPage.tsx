import './EditPage.css'
import {CategoryPlan, MonthPlan} from "../../types/MonthPlan.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {MonthPlanDTO} from "../../types/MonthPlanDTO.ts";


type Props = {
    monthPlan: MonthPlan | undefined
    setMonthPlan: React.Dispatch<React.SetStateAction<MonthPlan>>
}

export default function EditPage(props: Readonly<Props>) {
    const defaultCategoryPlan: CategoryPlan = {
        category: "", categoryBudget: 0.00, categoryLeftover: 0.00
    }
    const [category0, setCategory0] = useState<CategoryPlan>(
        defaultCategoryPlan)
    const [category1, setCategory1] = useState<CategoryPlan>(
        defaultCategoryPlan)
    const [category2, setCategory2] = useState<CategoryPlan>(
        defaultCategoryPlan)
    const [category3, setCategory3] = useState<CategoryPlan>(
        defaultCategoryPlan)
    const [category4, setCategory4] = useState<CategoryPlan>(
        defaultCategoryPlan)

    useEffect(() => {
        if (props.monthPlan) {
            setCategory0(props.monthPlan.categoryPlans[0])
            setCategory1(props.monthPlan.categoryPlans[1])
            setCategory2(props.monthPlan.categoryPlans[2])
            setCategory3(props.monthPlan.categoryPlans[3])
            setCategory4(props.monthPlan.categoryPlans[4])
        }
    }, []);


    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        const source = event.target.name;
        const data = new InputEvent(event.target.value);
        const value = data.type;
        if (source === "category0-name") {
            const newCategoryPlan: CategoryPlan = {
                category: value,
                categoryBudget: category0.categoryBudget,
                categoryLeftover: category0.categoryLeftover
            };
            setCategory0(newCategoryPlan)
        }
        if (source === "category1-name") {
            const newCategoryPlan: CategoryPlan = {
                category: value,
                categoryBudget: category1.categoryBudget,
                categoryLeftover: category1.categoryLeftover
            };
            setCategory1(newCategoryPlan)
        }
        if (source === "category2-name") {
            const newCategoryPlan: CategoryPlan = {
                category: value,
                categoryBudget: category2.categoryBudget,
                categoryLeftover: category2.categoryLeftover
            };
            setCategory2(newCategoryPlan)
        }
        if (source === "category3-name") {
            const newCategoryPlan: CategoryPlan = {
                category: value,
                categoryBudget: category3.categoryBudget,
                categoryLeftover: category3.categoryLeftover
            };
            setCategory3(newCategoryPlan)
        }
        if (source === "category4-name") {
            const newCategoryPlan: CategoryPlan = {
                category: value,
                categoryBudget: category4.categoryBudget,
                categoryLeftover: category4.categoryLeftover
            };
            setCategory4(newCategoryPlan)
        }
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const source = event.target.name;
        const data = new InputEvent(event.target.value);
        const value: number = parseInt(data.type);
        if (source === "category0-input") {
            const newCategoryPlan: CategoryPlan = {
                category: category0.category,
                categoryBudget: value,
                categoryLeftover: category0.categoryLeftover
            };
            setCategory0(newCategoryPlan)
        }
        if (source === "category1-input") {
            const newCategoryPlan: CategoryPlan = {
                category: category1.category,
                categoryBudget: value,
                categoryLeftover: category1.categoryLeftover
            };
            setCategory1(newCategoryPlan)
        }
        if (source === "category2-input") {
            const newCategoryPlan: CategoryPlan = {
                category: category2.category,
                categoryBudget: value,
                categoryLeftover: category2.categoryLeftover
            };
            setCategory2(newCategoryPlan)
        }
        if (source === "category3-input") {
            const newCategoryPlan: CategoryPlan = {
                category: category3.category,
                categoryBudget: value,
                categoryLeftover: category3.categoryLeftover
            };
            setCategory3(newCategoryPlan)
        }
        if (source === "category4-input") {
            const newCategoryPlan: CategoryPlan = {
                category: category4.category,
                categoryBudget: value,
                categoryLeftover: category4.categoryLeftover
            };
            setCategory4(newCategoryPlan)
        }
    }

    function updateMonthPlan(){
        if (!props.monthPlan) {return}
        const editedMonthPlan:MonthPlan = {
            id:props.monthPlan.id,
            user: "",
            yearMonth:props.monthPlan.yearMonth,
            totalBudget: props.monthPlan.totalBudget,
            totalLeftover:props.monthPlan.totalLeftover,
            categoryPlans: [category0, category1, category2, category3, category4],
            transactions: props.monthPlan.transactions
        }
        axios.post("/api/budget", editedMonthPlan)
            .then(response => props.setMonthPlan(response.data))
                .catch((error) => {
                    console.error("Error fetching data:", error);
                })
    }
// TODO wo wird ausgewählt für welchen monat

   function createMonthPlan(){
        if (!props.monthPlan) {return}
        const newMonthPlan:MonthPlanDTO = {
            yearMonth:"2025-01",
            totalBudget: props.monthPlan.totalBudget,
            categoryPlans: [category0, category1, category2, category3, category4],
        }
        axios.put("/api/budget", newMonthPlan)
            .then(response => props.setMonthPlan(response.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }

    return (<main>
        {props.monthPlan  && <h2>{props.monthPlan?.totalLeftover} left
            of {props.monthPlan?.totalBudget}</h2>}
        <form>
            <div className={"category-wrapper"}>
                <label className={"hidden"}>Name of category 0</label>
                <input className={"category0-name"}
                       name={"category0-name"}
                       value={category0.category}
                       onChange={handleChangeName}/>
                <label className={"hidden"}>Budget of category 0</label>
                <input className={"category-input"}
                       name={"category0-input"}
                       value={category0.categoryBudget}
                       onChange={handleChangeInput}/>
                <p className={"category-leftover"}>{category0.categoryLeftover}</p>
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"}>Name of category 1</label>
                <input className={"category-name"}
                       name={"category1-name"}
                       value={category1.category}
                       onChange={handleChangeName}/>
                <label className={"hidden"}>Budget of category 1</label>
                <input className={"category-input"}
                       name={"category1-input"}
                       value={category1.categoryBudget}
                       onChange={handleChangeInput}/>
                <p className={"category-leftover"}>{category1.categoryLeftover}</p>
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"}>Name of category 2</label>
                <input className={"category-name"}
                       name={"category2-name"}
                       value={category2.category}
                       onChange={handleChangeName}/>
                <label className={"hidden"}>Budget of category 2</label>
                <input className={"category-input"}
                       name={"category2-input"}
                       value={category2.categoryBudget}
                       onChange={handleChangeInput}/>
                <p className={"category-leftover"}>{category2.categoryLeftover}</p>
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"}>Name of category 3</label>
                <input className={"category-name"}
                       name={"category3-name"}
                       value={category3.category}
                       onChange={handleChangeName}/>
                <label className={"hidden"}>Budget of category 3</label>
                <input className={"category-input"}
                       name={"category3-input"}
                       value={category3.categoryBudget}
                       onChange={handleChangeInput}/>
                <p className={"category-leftover"}>{category3.categoryLeftover}</p>
            </div>
            <div className={"category-wrapper"}>
                <label className={"hidden"}>Name of category 4</label>
                <input className={"category-name"}
                       name={"category4-name"}
                       value={category4.category}
                       onChange={handleChangeName}/>
                <label className={"hidden"}>Budget of category 4</label>
                <input className={"category-input"}
                       name={"category4-input"}
                       value={category4.categoryBudget}
                       onChange={handleChangeInput}/>
                <p className={"category-leftover"}>{category4.categoryLeftover}</p>
            </div>
            <button onClick={props.monthPlan ? updateMonthPlan : createMonthPlan}>Save changes</button>
        </form>
    </main>)
}