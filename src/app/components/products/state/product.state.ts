import { HttpErrorResponse } from "@angular/common/http";
import { ProductModel } from "src/app/models/ProductModel";
import { AppState } from "src/app/state/app.state";

export interface ProductState extends AppState{
    productList:ProductModel[];
    currencyCodes:string[];
    selectedCurrencyCode:string;
    loading:boolean;
    updateLoading:boolean;
    addLaoding:boolean;
    deleteLoading:boolean;
    error:any | undefined;
}
