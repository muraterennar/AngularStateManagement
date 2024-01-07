import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.state';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/ProductModel';
import { getProductByIdSelector, getProductListSelector } from '../state/product.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productActionRemove, productActionUpdate } from '../state/product.action';

@Component({
  selector: 'app-product-b',
  templateUrl: './product-b.component.html',
  styleUrls: ['./product-b.component.css']
})
export class ProductBComponent implements OnInit, OnDestroy {

  getProductByIdData:ProductModel;
  productSubscription:Subscription;
  productForm:FormGroup;
  products:ProductModel[];

  constructor(private productStore:Store<ProductState>, private form:FormBuilder) { }

  ngOnInit(): void {
    this.productSubscription = this.productStore.select(getProductListSelector).subscribe(p=> this.products = p);
    this.createProductForm();
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

    // Produt Form
    createProductForm(){
      this.productForm = this.form.group({
        productName:["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        price:[0, Validators.min(0)],
        description:["",[Validators.minLength(3), Validators.maxLength(50)]]
      });
    }

  getProductById(id:string){
    this.productSubscription = this.productStore.select(getProductByIdSelector(id)).subscribe(p=>this.getProductByIdData = p);
    console.log("Get Product By Id", this.getProductByIdData);
  }

  // Update Product
  updateProduct(){
    console.log("Update Product");
    if(this.productForm.valid){
      const updatedProduct:ProductModel ={
        id:this.getProductByIdData.id,
        productName:this.productForm.value.productName,
        price:this.productForm.value.price,
        description:this.productForm.value.description,
        imageUrl:"https://via.placeholder.com/500x500"
      }
  
      this.productStore.dispatch(productActionUpdate({
        product:updatedProduct
      }));
    }
  }

  // Delete Product
  deleteProduct(id:string){
    console.log("Delete Product");
    this.productStore.dispatch(productActionRemove({
      productId:id
    }))
  }

}
