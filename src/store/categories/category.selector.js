import {createSelector} from "reselect"
import Category from './../../routes/category/category.component';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
    categories.reduce(( acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc
  },{})
)