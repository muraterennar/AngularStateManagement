import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAComponent } from './product-a/product-a.component';
import { ProductBComponent } from './product-b/product-b.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductAComponent,
    ProductBComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {path:"", component:ProductAComponent},
        {path:"product-a", component:ProductAComponent},
        {path:"product-b", component:ProductBComponent}
      ]
    ),
    StoreModule.forFeature("productReducerSlice", productReducer)
  ],
  exports: [
    ProductAComponent,
    ProductBComponent
  ]
})
export class ProductsModule { }
