import { createReducer, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import { productActionAdd, productActionLoad, productActionLoadFaild, productActionLoadSuccess, productActionRemove, productActionUpdate, productActionUpdateCurrency, productActionUpdateOnFailed, productActionUpdateOnSuceess } from "./product.action";
import { ProductModel } from "src/app/models/ProductModel";

const initialProductState: ProductState = {
    productList: [],
    currencyCodes: ["USD", "EUR", "TRY"],
    selectedCurrencyCode: "USD",
    error: undefined,
    loading: false,
    updateLoading: false,
    addLaoding: false,
    deleteLoading: false
};

export const productReducer = createReducer<ProductState>(
    initialProductState,

    //Add
    on(productActionAdd, (state, action): ProductState => {
        return { ...state, productList: [...state.productList, action.product] }
    }),

    //Remove
    on(productActionRemove, (state, action): ProductState => {
        return { ...state, productList: state.productList.filter(p => p.id !== action.productId) }
    }),

    // ------- Update
    on(productActionUpdate, (state, action):ProductState=>{
        return {...state, loading:true, error:undefined};
    }),

    on(productActionUpdateOnSuceess, (state, action): ProductState => {
        const updatedProductList: ProductModel[] = state.productList.map(p => p.id === action.product.id ? action.product : p);
        return { ...state, productList: updatedProductList, updateLoading:false, error:undefined };
    }),

    on(productActionUpdateOnFailed, (state,action):ProductState=>{
        return {...state, updateLoading:false, error:action.error};
    }),

    // ----------- Update Currency Code
    on(productActionUpdateCurrency, (state, action): ProductState => {
        return { ...state, selectedCurrencyCode: action.selectedCurrencyCode };
    }),

    // ----------- Get All Products
    //Load Success
    on(productActionLoadSuccess, (state, action): ProductState => {
        return { ...state, productList: action.products, loading:false, error:undefined };
    }),

    // Loading
    on(productActionLoad, (state):ProductState=>{
        return {...state, loading:true};
    }),

    //Load Faild
    on(productActionLoadFaild, (state, action): ProductState => {
        return { ...state, error: action.error, loading:false };
    })
)