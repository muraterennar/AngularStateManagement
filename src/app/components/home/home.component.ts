import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { getCounterSelector, getUserSelector } from 'src/app/state/app.selectors';
import { CounterState, UserState } from 'src/app/state/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  storeSubscription?: Subscription;

  user: UserModel;
  counter: number;

  constructor(
    private counterStore: Store<CounterState>,
    private userStore: Store<UserState>
  ) { }


  ngOnInit(): void {
    this.storeSubscription = this.counterStore.select(getCounterSelector).subscribe((response) => {
      this.counter = response
      console.log("Home Counter: ", response);
    });


    this.storeSubscription = this.userStore.select(getUserSelector).subscribe((response) => {
      this.user = response;
      console.log("Home User: ", response);
    });
  }
  ngOnDestroy(): void {
    return this.storeSubscription.unsubscribe();
  }

}
