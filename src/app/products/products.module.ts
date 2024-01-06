import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAComponent } from './product-a/product-a.component';
import { ProductBComponent } from './product-b/product-b.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductAComponent,
    ProductBComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path:"", component:ProductAComponent},
        {path:"product-a", component:ProductAComponent},
        {path:"product-b", component:ProductBComponent}
      ]
    )
  ],
  exports:[
    ProductAComponent,
    ProductBComponent
  ]
})
export class ProductsModule { }
