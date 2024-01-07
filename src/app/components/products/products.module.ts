import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAComponent } from './product-a/product-a.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductAComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {path:"", component:ProductAComponent}
      ]
    ),
    StoreModule.forFeature("productReducerSlice", productReducer)
  ],
  exports: [
    ProductAComponent
  ]
})
export class ProductsModule { }
