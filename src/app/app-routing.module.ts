import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./components/home/home.module").then((m) => m.HomeModule)
  },
  {
    path: "counter",
    loadChildren: () => import("./components/counter/counter.module").then((m) => m.CounterModule)
  },
  {
    path: "user",
    loadChildren: () => import("./components/user/user.module").then((m) => m.UserModule)
  },
  {
    path: "products",
    loadChildren: () => import("./components/products/products.module").then((m) => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
