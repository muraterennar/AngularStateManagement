import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

const getProductState = createFeatureSelector<ProductState>("productReducerSlice");

// Get Product List - Loading - Error
export const getProductLoadingSelector = createSelector(getProductState, state => state.loading);
export const getProductListSelector = createSelector(getProductState, state => state.productList);
export const getProductErrorSelector = createSelector(getProductState, state => state.error);

// Add Product - Loading - Error
export const addProductLoadingSelector = createSelector(getProductState, state => state.loading);
export const addProductListSelector = createSelector(getProductState, state => state.productList);
export const addProductErrorSelector = createSelector(getProductState, state => state.error);

// Update Product - Loading - Error
export const updateProductLoadingSelector = createSelector(getProductState, state => state.loading);
export const updateProductListSelector = createSelector(getProductState, state => state.productList);
export const updateProductErrorSelector = createSelector(getProductState, state => state.error);

// Delete Product - Loading - Error
export const deleteProductLoadingSelector = createSelector(getProductState, state => state.loading);
export const deleteProductListSelector = createSelector(getProductState, state => state.productList);
export const deleteProductErrorSelector = createSelector(getProductState, state => state.error);

// Get Currency Codes
export const getProductCurrenyListSelector = createSelector(getProductState, state => state.currencyCodes);

// Get Selected Currency Code
export const getProductSelectedCurrenySelector = createSelector(getProductState, state => state.selectedCurrencyCode);

// Get Product By Id
export const getProductByIdSelector = (id: string) => createSelector(getProductState, state => state.productList.find(p => p.id === id));

