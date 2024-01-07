import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

const getProductState  = createFeatureSelector<ProductState>("productReducerSlice");

// Get Product List
export const getProductListSelector = createSelector(getProductState, state => state.productList);

// Get Currency Code
export const getProductCurrenyListSelector = createSelector(getProductState, state => state.currencyCode);

// Get Product By Id
export const getProductByIdSelector = (id:string) => createSelector(getProductState, state => state.productList.find(p=>p.id === id));