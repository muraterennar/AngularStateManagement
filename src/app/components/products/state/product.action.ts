import { createAction, props } from "@ngrx/store"
import { ProductModel } from "src/app/models/ProductModel";

export const productActionUpdateCurrency = createAction("Update Currency", props<{ selectedCurrencyCode:string }>());

// Get All Products
export const productActionLoad = createAction("Load Products");
export const productActionLoadSuccess = createAction("Load Products Success", props<{ products: ProductModel[] }>());
export const productActionLoadFaild = createAction("Load Products Faild", props<{ error:any }>());

// Add Product
export const productActionAdd = createAction("Add Product", props<{ product: ProductModel }>());
export const productActionAddSuccess = createAction("Add Product Success", props<{ product: ProductModel }>());
export const productActionAddFaild = createAction("Add Product Faild", props<{ error:any }>());


// Update Product
export const productActionUpdate = createAction("Update Product", props<{ product: ProductModel }>());
export const productActionUpdateSuccess = createAction("Update Product Success", props<{ product: ProductModel }>());
export const productActionUpdateFaild = createAction("Update Product Faild", props<{ error:any }>());

// Delete Product
export const productActionDelete = createAction("Delete Product", props<{ id: string }>());
export const productActionDeleteSuccess = createAction("Delete Product Success", props<{ id: string }>());
export const productActionDeleteFaild = createAction("Delete Product Faild", props<{ error:any }>());