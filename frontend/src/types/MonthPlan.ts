export type MonthPlan = {
    id:string,
    user:string
    yearMonth:string,
    totalBudget:number,
    totalLeftover:number,
    categoryPlans: CategoryPlan[],
    transactions: Transaction[]
}

export type CategoryPlan = {
    category:string,
    categoryBudget:number,
    categoryLeftover:number
}

export type Transaction={
    id:string,
    timestamp:string,
    user:string,
    amount:number,
    note:string,
    category:string
}