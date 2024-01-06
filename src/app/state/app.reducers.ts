import { createReducer, on } from "@ngrx/store";
import { CounterState, UserState } from "./app.state";
import { actionDecreaseCounter, actionIncreaseCounter, actionUpdateUser } from "./app.actions";

export const counterReducer = createReducer<CounterState>(
    { Counter: 0 },

    //Increase
    on(actionIncreaseCounter, (state): CounterState => {
        return { ...state, Counter: state.Counter + 1 }
    }),

    //Descrease
    on(actionDecreaseCounter, (state): CounterState => {
        if (state.Counter > 0)
            return { ...state, Counter: state.Counter - 1 }
        else
            return state
    })
);

export const userReducer = createReducer<UserState>(
    { User: null },

    on(actionUpdateUser, (state, action): UserState => {
        return { ...state, User: action.user }
    }),
);