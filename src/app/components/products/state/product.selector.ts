import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

const getProductState  = createFeatureSelector<ProductState>("productReducerSlice");

// Get Product List
export const getProductListSelector = createSelector(getProductState, state => state.productList);

// Get Currency Codes
export const getProductCurrenyListSelector = createSelector(getProductState, state => state.currencyCodes);

// Get Selected Currency Code
export const getProductSelectedCurrenySelector = createSelector(getProductState, state => state.selectedCurrencyCode);

// Get Product By Id
export const getProductByIdSelector = (id:string) => createSelector(getProductState, state => state.productList.find(p=>p.id === id));