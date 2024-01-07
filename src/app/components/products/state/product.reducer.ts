import { createReducer, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import { productActionAdd, productActionRemove, productActionUpdate, productActionUpdateCurrency } from "./product.action";
import { state } from "@angular/animations";
import { ProductModel } from "src/app/models/ProductModel";
import { guidGenerator } from "../../user/user.component";

const initialProductState: ProductState = {
    productList: [
        {id:guidGenerator(), productName:"Samsung S5", price:1000, description:"Samsung S5 Description", imageUrl:"https://via.placeholder.com/500x500"},
    ],
    currencyCode: "TR"
}

export const productReducer = createReducer<ProductState>(
    initialProductState,

    //Add
    on(productActionAdd, (state, action): ProductState=>{
        return {...state, productList:[...state.productList, action.product]}
    }),

    //Remove
    on(productActionRemove, (state,action):ProductState=>{
        return {...state, productList:state.productList.filter(p=>p.id !== action.productId)}
    }),

    //Update
    on(productActionUpdate, (state,action):ProductState=>{
        const updatedProductList:ProductModel[] = state.productList.map(p=>p.id === action.product.id ? action.product : p);
        return {...state,productList:updatedProductList};
    }),   

    //Update Currency
    on(productActionUpdateCurrency, (state,action):ProductState=>{
        return {...state, currencyCode:action.currencyCode};
    }),
)