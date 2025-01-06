export type MonthPlanDTO = {
    yearMonth:string,
    totalBudget:number,
    categoryPlans: CategoryPlanDTO[],
}

export type CategoryPlanDTO = {
    category:string,
    categoryBudget:number
}
