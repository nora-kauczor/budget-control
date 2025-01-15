import './EditForm.css'
import {CategoryPlan, MonthPlan} from "../../types/MonthPlan.ts";
import {useEffect, useState} from "react";
import axios from "axios";

type Props = {
    monthPlan: MonthPlan | undefined
    setMonthPlan: React.Dispatch<React.SetStateAction<MonthPlan>>
}

export default function EditForm(props: Readonly<Props>){
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

    function handleChangeBudget(event: React.ChangeEvent<HTMLInputElement>) {
        const source = event.target.name;
        const value:number = Number(event.target.value);
        if (source === "category0-budget") {
            const newCategoryPlan: CategoryPlan = {
                category: category0.category,
                categoryBudget: value,
                categoryLeftover: category0.categoryLeftover
            };
            setCategory0(newCategoryPlan)
        }
        if (source === "category1-budget") {
            const newCategoryPlan: CategoryPlan = {
                category: category1.category,
                categoryBudget: value,
                categoryLeftover: category1.categoryLeftover
            };
            setCategory1(newCategoryPlan)
        }
        if (source === "category2-budget") {
            const newCategoryPlan: CategoryPlan = {
                category: category2.category,
                categoryBudget: value,
                categoryLeftover: category2.categoryLeftover
            };
            setCategory2(newCategoryPlan)
        }
        if (source === "category3-budget") {
            const newCategoryPlan: CategoryPlan = {
                category: category3.category,
                categoryBudget: value,
                categoryLeftover: category3.categoryLeftover
            };
            setCategory3(newCategoryPlan)
        }
        if (source === "category4-budget") {
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


    return (<main>
            {props.monthPlan && <h2>{props.monthPlan.yearMonth}</h2>}
            {props.monthPlan && <h2>{props.monthPlan?.totalLeftover} left
                of {props.monthPlan?.totalBudget}</h2>}
            <form>
                <div className={"category-wrapper"}>
                    <label className={"hidden"}  htmlFor={"category0-name"}>Name of category 0</label>
                    <input className={"category0-name"}
                           name={"category0-name"}
                           value={category0.category}
                           onChange={handleChangeName}/>
                    <label className={"hidden"} htmlFor={"category0-budget"}>Budget of category 0</label>
                    <input className={"category-budget"}
                           name={"category0-budget"}
                           value={category0.categoryBudget}
                           onChange={handleChangeBudget}/>
                    <p className={"category-leftover"}>{category0.categoryLeftover}</p>
                </div>
                <div className={"category-wrapper"}>
                    <label className={"hidden"} htmlFor={"category1-name"}>Name of category 1</label>
                    <input className={"category-name"}
                           name={"category1-name"}
                           value={category1.category}
                           onChange={handleChangeName}/>
                    <label className={"hidden"} htmlFor={"category1-budget"}>Budget of category 1</label>
                    <input className={"category-budget"}
                           name={"category1-budget"}
                           value={category1.categoryBudget}
                           onChange={handleChangeBudget}/>
                    <p className={"category-leftover"}>{category1.categoryLeftover}</p>
                </div>
                <div className={"category-wrapper"}>
                    <label className={"hidden"} htmlFor={"category2-name"}>Name of category 2</label>
                    <input className={"category-name"}
                           name={"category2-name"}
                           value={category2.category}
                           onChange={handleChangeName}/>
                    <label className={"hidden"} htmlFor={"category2-budget"}>Budget of category 2</label>
                    <input className={"category-budget"}
                           name={"category2-budget"}
                           value={category2.categoryBudget}
                           onChange={handleChangeBudget}/>
                    <p className={"category-leftover"}>{category2.categoryLeftover}</p>
                </div>
                <div className={"category-wrapper"}>
                    <label className={"hidden"} htmlFor={"category3-name"}>Name of category 3</label>
                    <input className={"category-name"}
                           name={"category3-name"}
                           value={category3.category}
                           onChange={handleChangeName}/>
                    <label className={"hidden"} htmlFor={"category3-budget"}>Budget of category 3</label>
                    <input className={"category-budget"}
                           name={"category3-budget"}
                           value={category3.categoryBudget}
                           onChange={handleChangeBudget}/>
                    <p className={"category-leftover"}>{category3.categoryLeftover}</p>
                </div>
                <div className={"category-wrapper"}>
                    <label className={"hidden"} htmlFor={"category4-name"}>Name of category 4</label>
                    <input className={"category-name"}
                           name={"category4-name"}
                           value={category4.category}
                           onChange={handleChangeName}/>
                    <label className={"hidden"} htmlFor={"category4-budget"}>Budget of category 4</label>
                    <input className={"category-budget"}
                           name={"category4-budget"}
                           value={category4.categoryBudget}
                           onChange={handleChangeBudget}/>
                    <p className={"category-leftover"}>{category4.categoryLeftover}</p>
                </div>
                <button onClick={updateMonthPlan}>Save changes
                </button>
            </form>
        </main>

    )
}