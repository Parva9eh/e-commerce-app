import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { categoryMap } from "./category.types";

const selectCategoriesReducer = (state): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce(
        (acc,{title, items})=>{
            acc[title.toLowerCase()]= items;
            return acc;
        },
        {} as categoryMap
    )
)

export const selectIsCategoriesLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)