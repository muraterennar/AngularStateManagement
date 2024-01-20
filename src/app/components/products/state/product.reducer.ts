import { createReducer, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import { productActionAdd, productActionAddFaild, productActionAddSuccess, productActionDelete, productActionDeleteFaild, productActionDeleteSuccess, productActionLoad, productActionLoadFaild, productActionLoadSuccess, productActionUpdate, productActionUpdateCurrency, productActionUpdateFaild, productActionUpdateSuccess } from "./product.action";
import { ProductModel } from "src/app/models/ProductModel";

const initialProductState: ProductState = {
    productList: [],
    currencyCodes: ["USD", "EUR", "TRY"],
    selectedCurrencyCode: "USD",
    error: undefined,
    loading: false
};

export const productReducer = createReducer<ProductState>(
    initialProductState,
    // ----------- Get All Products
    //Load Success
    on(productActionLoadSuccess, (state, action): ProductState => {
        return { ...state, productList: action.products, loading: false, error: undefined };
    }),

    // Loading
    on(productActionLoad, (state): ProductState => {
        return { ...state, loading: true };
    }),

    //Load Faild
    on(productActionLoadFaild, (state, action): ProductState => {
        return { ...state, error: action.error, loading: false };
    }),

    // ----------- Add Product
    //Loading
    on(productActionAdd, (state): ProductState => {
        return { ...state, loading: true, error: undefined, productList: [...state.productList] };
    }),

    //Load Success
    on(productActionAddSuccess, (state, action): ProductState => {
        return { ...state, loading: false, error: undefined, productList: [...state.productList, action.product] };
    }),

    //Load Faild
    on(productActionAddFaild, (state, action): ProductState => {
        return { ...state, loading: false, error: action.error, productList: [...state.productList] };
    }),

    // ----------- Update Product
    //Loading
    on(productActionUpdate, (state, action): ProductState => {
        const updatedProductList: ProductModel[] = state.productList.map(p => p.id === action.product.id ? action.product : p);
        return { ...state, loading: true, error: undefined, productList: updatedProductList };
    }),

    on(productActionUpdateSuccess, (state, action): ProductState => {
        const updatedProductList: ProductModel[] = state.productList.map(p => p.id === action.product.id ? action.product : p);
        return { ...state, loading: false, error: undefined, productList: updatedProductList };
    }),

    on(productActionUpdateFaild, (state, action): ProductState => {
        return { ...state, loading: false, error: action.error, productList: [...state.productList] };
    }),

    // ----------- Delete Product
    //Loading
    on(productActionDelete, (state, action): ProductState => {
        return { ...state, loading: true, error: undefined, productList: [...state.productList.filter(p => p.id !== action.id)] };
    }),

    on(productActionDeleteSuccess, (state, action): ProductState => {
        return { ...state, loading: false, error: undefined, productList: [...state.productList.filter(p => p.id !== action.id)] };
    }),

    on(productActionDeleteFaild, (state, action): ProductState => {
        return { ...state, loading: false, error: action.error, productList: [...state.productList] };
    }),
);