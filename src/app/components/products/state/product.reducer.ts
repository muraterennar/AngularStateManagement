import { createReducer, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import { productActionAdd, productActionLoadSuccess, productActionRemove, productActionUpdate, productActionUpdateCurrency } from "./product.action";
import { ProductModel } from "src/app/models/ProductModel";
import { guidGenerator } from "../../user/user.component";

const initialProductState: ProductState = {
    productList:[],
    currencyCodes: ["USD", "EUR", "TRY"],
    selectedCurrencyCode: "USD"
};

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

    //Update Currency Code
    on(productActionUpdateCurrency, (state,action):ProductState=>{
        return {...state, selectedCurrencyCode:action.selectedCurrencyCode};
    }),

    on(productActionLoadSuccess, (state, action):ProductState=>{
        return {...state, productList:action.products};
    } )
)