import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { actionDecreaseCounter, actionIncreaseCounter } from 'src/app/state/app.actions';
import { getCounterSelector } from 'src/app/state/app.selectors';
import { CounterState } from 'src/app/state/app.state';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

  counterSubscription?: Subscription;
  data?:number;

  constructor(private store: Store<CounterState>) { }


  increaseCounter() {
    this.store.dispatch(actionIncreaseCounter());
  }

  decreaseCounter() {
    this.store.dispatch(actionDecreaseCounter());
  }

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getCounterSelector).subscribe((response) => {
      console.log("Counter :" + response);
      this.data = response
    });
  }


  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
    console.log("counter destroy");
  }
}
