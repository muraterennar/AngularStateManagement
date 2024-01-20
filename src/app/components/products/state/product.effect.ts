import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product-services/product.service";
import { productActionAdd, productActionAddFaild, productActionAddSuccess, productActionDelete, productActionDeleteSuccess, productActionLoad, productActionLoadFaild, productActionLoadSuccess, productActionUpdate, productActionUpdateFaild, productActionUpdateSuccess } from "./product.action";
import { catchError, from, map, mergeMap, of, switchMap, toArray } from "rxjs";
import { ProductModel } from "src/app/models/ProductModel";

@Injectable()
export class ProductEffect {

    constructor(private action: Actions, private productService: ProductService) { }

    // Get all products
    loadProductEffect$ = createEffect(() => {
        return this.action.pipe(ofType(productActionLoad), mergeMap(() =>
            this.productService.getAllProducts().pipe(switchMap(sm => from(sm)), map(m => {
                return { id: m.id, title: m.title, price: m.price, image: m.image, description: m.description, category: m.category } as ProductModel
            }),
                toArray(),
                map(m => productActionLoadSuccess({ products: m })),
                // Error handling
                catchError(err => of(productActionLoadFaild({ error: err })))
            )
        ));
    });

    // Add product
    addProductEffect$ = createEffect(() => {
        return this.action.pipe(
            ofType(productActionAdd), mergeMap((action) =>
                this.productService.addProduct(action.product).pipe(
                    map(product => productActionAddSuccess({ product })),
                    catchError(error => of(productActionAddFaild({ error })))
                )
            )
        );
    });

    // Update product
    updateProductEffect$ = createEffect(() => {
        return this.action.pipe(
            ofType(productActionUpdate), mergeMap((action) =>
                this.productService.updateProduct(action.product).pipe(
                    map(product => productActionUpdateSuccess({ product })),
                    catchError(error => of(productActionUpdateFaild({ error })))
                )
            )
        );
    });

    // Delete product
    deleteProductEffect$ = createEffect(() => {
        debugger;
        return this.action.pipe(
            ofType(productActionDelete), mergeMap((action) =>
                this.productService.deleteProduct(action.id).pipe(
                    map(() => productActionDeleteSuccess({ id: action.id })),
                    catchError(error => of(productActionUpdateFaild({ error })))
                )
            )
        );
    });

}
