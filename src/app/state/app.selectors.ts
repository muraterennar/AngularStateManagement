import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState, UserState } from "./app.state";

const getCounterState = createFeatureSelector<CounterState>("counterReducerSlice");

export const getCounterSelector = createSelector(getCounterState, state => state.Counter);


const getUserState = createFeatureSelector<UserState>("userReducerSlice");

export const getUserSelector = createSelector(getUserState, state => state.User);