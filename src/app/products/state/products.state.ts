import { ProductModel } from "src/app/models/ProductModel";
import { AppState } from "src/app/state/app.state";

export interface ProductsStare extends AppState {
    ProductList: ProductModel[];
}