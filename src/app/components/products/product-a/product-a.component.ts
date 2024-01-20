import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.state';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/ProductModel';
import { getProductByIdSelector, getProductErrorSelector, getProductListSelector, getProductLoadingSelector, getProductSelectedCurrenySelector } from '../state/product.selector';
import { productActionAdd, productActionDeleteSuccess, productActionLoad, productActionUpdate, productActionUpdateSuccess } from '../state/product.action';
import { guidGenerator } from '../../user/user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-a',
  templateUrl: './product-a.component.html',
  styleUrls: ['./product-a.component.css']
})
export class ProductAComponent implements OnInit, OnDestroy {

  products: ProductModel[];
  getProductByIdData: ProductModel;
  loading: boolean;
  updatedLoading: boolean;
  error: any | undefined;

  productSubscription: Subscription;
  productForm: FormGroup;

  currentCurrency: Observable<string>;

  constructor(private productStore: Store<ProductState>, private form: FormBuilder) { }


  ngOnInit(): void {
    // Create Product Form
    this.createProductForm();

    // Get Products
    this.getProducts();

    this.loadingProduct();

    this.errorProduct();

    // Get Selected Currency Code
    this.currentCurrency = this.productStore.select(getProductSelectedCurrenySelector);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  // Produt Form
  createProductForm() {
    this.productForm = this.form.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: ["", Validators.min(0)],
      description: ["", [Validators.minLength(3), Validators.maxLength(50)]],
      category: ["", [Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  // Get Form Control
  get component(): any {
    return this.productForm.controls;
  }

  // Get Products
  getProducts() {
    // Get Product List
    this.productSubscription = this.productStore.select(getProductListSelector).subscribe(p => {
      this.products = p;

      if (p.length === 0) {
        -
          this.productStore.dispatch(productActionLoad());
      }
    });
  }

  loadingProduct() {
    this.productSubscription = this.productStore.select(getProductLoadingSelector).subscribe(loading => this.loading = loading);
  }

  errorProduct() {
    this.productSubscription = this.productStore.select(getProductErrorSelector).subscribe(err => {
      if (err !== undefined) {
        this.error = err
        alert(err.message);
        console.log(err);
      }
    });
  }

  // Get Product By Id
  getProductById(id: string) {
    this.productSubscription = this.productStore.select(getProductByIdSelector(id)).subscribe(p => {
      this.getProductByIdData = p;
    });
  }

  // Add Product
  addProduct() {
    if (this.productForm.valid) {
      const product: ProductModel = {
        id: guidGenerator(),
        title: this.productForm.value.title,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        category: "elektronik",
        image: "https://via.placeholder.com/500x500"
      };

      this.productStore.dispatch(productActionAdd({ product }));

      console.log(product);
    }
    else {
      alert("Form is invalid!")
    }
  }

  // Update Currency
  updateProduct(title: string, category: string, price: string, description: string,) {
    const updatedProduct: ProductModel = {
      id: this.getProductByIdData?.id,
      title: title,
      price: parseInt(price),
      description: description,
      category: category,
      image: this.getProductByIdData?.image
    }
    debugger;
    this.productStore.dispatch(productActionUpdateSuccess({ product: updatedProduct }));

    console.log({
      id: this.getProductByIdData.id,
      title,
      category,
      price: parseInt(price),
      description,
      image: this.getProductByIdData.image
    });
  }

  // Delete Product
  deleteProduct(id: string) {
    debugger;
    this.productStore.dispatch(productActionDeleteSuccess({ id }));
  }
}
