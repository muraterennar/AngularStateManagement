import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAComponent } from './product-a/product-a.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './state/product.effect';



@NgModule({
  declarations: [
    ProductAComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {path:"", component:ProductAComponent}
      ]
    ),
    StoreModule.forFeature("productReducerSlice", productReducer),
    EffectsModule.forFeature([ProductEffect])
  ],
  exports: [
    ProductAComponent
  ]
})
export class ProductsModule { }
