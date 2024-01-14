import { createAction, props } from "@ngrx/store"
import { ProductModel } from "src/app/models/ProductModel";

export const productActionAdd = createAction("Add Product", props<{ product: ProductModel }>());

export const productActionRemove = createAction("Remove Product", props<{ productId:string }>());

export const productActionUpdateCurrency = createAction("Update Currency", props<{ selectedCurrencyCode:string }>());

export const productActionLoad = createAction("Load Products");
export const productActionLoadSuccess = createAction("Load Products Success", props<{ products: ProductModel[] }>());
export const productActionLoadFaild = createAction("Load Products Faild", props<{ error:any }>());

export const productActionUpdate = createAction("Update Product",props<{ product: ProductModel }>());
export const productActionUpdateOnSuceess = createAction("Update Product [Success]", props<{ product: ProductModel }>());
export const productActionUpdateOnFailed = createAction("Update Product [Failed]", props<{ error:any }>());