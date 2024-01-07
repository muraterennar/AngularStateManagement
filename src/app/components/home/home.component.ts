import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/ProductModel';
import { UserModel } from 'src/app/models/UserModel';
import { getCounterSelector, getUserSelector } from 'src/app/state/app.selectors';
import { CounterState, UserState } from 'src/app/state/app.state';
import { ProductState } from '../products/state/product.state';
import { getProductListSelector, getProductSelectedCurrenySelector } from '../products/state/product.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Observable<UserModel>;
  counter: Observable<number>;
  products:Observable<ProductModel[]>;
  currentCurrency:Observable<string>;

  constructor(
    private counterStore: Store<CounterState>,
    private userStore: Store<UserState>,
    private productStore: Store<ProductState>
  ) { }


  ngOnInit(): void {
    this.counter= this.counterStore.select(getCounterSelector);

    this.user = this.userStore.select(getUserSelector);

    this.products = this.productStore.select(getProductListSelector);

    this.currentCurrency = this.productStore.select(getProductSelectedCurrenySelector);
  }
}
