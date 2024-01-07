import { createAction, props } from "@ngrx/store"
import { ProductModel } from "src/app/models/ProductModel";

export const productActionAdd = createAction("Add Product", props<{ product: ProductModel }>());
export const productActionUpdate = createAction("Update Product", props<{ product: ProductModel }>());
export const productActionRemove = createAction("Remove Product", props<{ productId:string }>());

export const productActionUpdateCurrency = createAction("Update Currency", props<{ selectedCurrencyCode:string }>());