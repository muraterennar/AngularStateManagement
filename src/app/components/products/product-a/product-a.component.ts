import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.state';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/ProductModel';
import { getProductByIdSelector, getProductListSelector, getProductSelectedCurrenySelector } from '../state/product.selector';
import { productActionAdd, productActionLoad, productActionRemove, productActionUpdate } from '../state/product.action';
import { guidGenerator } from '../../user/user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-a',
  templateUrl: './product-a.component.html',
  styleUrls: ['./product-a.component.css']
})
export class ProductAComponent implements OnInit {

  products:Observable<ProductModel[]>;
  getProductByIdData:ProductModel;
  productSubscription:Subscription;
  productForm:FormGroup;

  currentCurrency:Observable<string>;

  constructor(private productStore:Store<ProductState>, private form:FormBuilder) {}


  ngOnInit(): void {
    // Create Product Form
    this.createProductForm();

    this.productStore.dispatch(productActionLoad())

    // Get Product List
    this.products = this.productStore.select(getProductListSelector);

    // Get Selected Currency Code
    this.currentCurrency = this.productStore.select(getProductSelectedCurrenySelector);
  }

  // Produt Form
   createProductForm(){
    this.productForm = this.form.group({
      title:["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price:[0, Validators.min(0)],
      description:["",[Validators.minLength(3), Validators.maxLength(50)]],
      category:["",[Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  // Add Product
  addProduct(){
    if(this.productForm.valid){
      const newProduct:ProductModel ={
        id:guidGenerator(),
        title:this.productForm.value.title,
        price:this.productForm.value.price,
        description:this.productForm.value.description,
        category:"elektronik",
        image:"https://via.placeholder.com/500x500"
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
        title:this.productForm.value.title,
        price:this.productForm.value.price,
        description:this.productForm.value.description,
        category:this.getProductByIdData.category,
        image:"https://via.placeholder.com/500x500"
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
