import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { counterReducer, userReducer } from './state/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CounterModule } from './components/counter/counter.module';
import { UserModule } from './components/user/user.module';
import { ProductsModule } from './components/products/products.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    CounterModule,
    UserModule,
    ProductsModule,

    StoreModule.forRoot(
      {
        "counterReducerSlice": counterReducer,
        "userReducerSlice": userReducer
      },
      {}
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
