import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from './components/products/state/product.state';
import { Observable } from 'rxjs';
import { productActionUpdateCurrency } from './components/products/state/product.action';
import { getProductCurrenyListSelector, getProductSelectedCurrenySelector } from './components/products/state/product.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currenyTypes:Observable<string[]>;
  currentCurrency:Observable<string>;

 constructor(private store:Store<ProductState>) {}


  ngOnInit(): void {
    this.currenyTypes = this.store.select(getProductCurrenyListSelector);
    this.currentCurrency = this.store.select(getProductSelectedCurrenySelector);
  }

  onCurrencyChange(currenyType?:string){
    this.store.dispatch(productActionUpdateCurrency({
       selectedCurrencyCode:currenyType
    }));
  }

}
