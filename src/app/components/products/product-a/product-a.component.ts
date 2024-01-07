import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.state';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/ProductModel';
import { getProductByIdSelector, getProductListSelector } from '../state/product.selector';
import { productActionAdd, productActionRemove, productActionUpdate } from '../state/product.action';
import { guidGenerator } from '../../user/user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-a',
  templateUrl: './product-a.component.html',
  styleUrls: ['./product-a.component.css']
})
export class ProductAComponent implements OnInit, OnDestroy {

  products:ProductModel[];
  getProductByIdData:ProductModel;
  productSubscription:Subscription;
  productForm:FormGroup;

  constructor(private productStore:Store<ProductState>, private form:FormBuilder) {}


  ngOnInit(): void {
    // Create Product Form
    this.createProductForm();

    // Get Product List
    this.productSubscription = this.productStore.select(getProductListSelector).subscribe(p=> this.products = p)
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

  // Add Product
  addProduct(){
    if(this.productForm.valid){
      const newProduct:ProductModel ={
        id:guidGenerator(),
        productName:this.productForm.value.productName,
        price:this.productForm.value.price,
        description:this.productForm.value.description,
        imageUrl:"https://via.placeholder.com/500x500"
      }
  
      this.productStore.dispatch(productActionAdd({
        product:newProduct
      }));
    }
  }

  // Get Product By Id
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
