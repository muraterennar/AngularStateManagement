import { createAction, props } from "@ngrx/store";
import { UserModel } from "../models/UserModel";

export const actionIncreaseCounter = createAction("Increase Counter");
export const actionDecreaseCounter = createAction("Decrease Counter");

export const actionUpdateUser = createAction("User Update", props<{ user: UserModel }>());