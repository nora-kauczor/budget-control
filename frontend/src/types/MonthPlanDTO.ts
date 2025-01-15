export type MonthPlanDTO = {
    yearMonth:string,
    categoryPlanDTOs: CategoryPlanDTO[],
}

export type CategoryPlanDTO = {
    category:string,
    categoryBudget:number
}
