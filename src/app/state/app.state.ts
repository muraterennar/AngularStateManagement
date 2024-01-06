import { UserModel } from "../models/UserModel";

export interface AppState {

}


export interface CounterState extends AppState {
    Counter: number;
}

export interface UserState extends AppState {
    User: UserModel;
}