import { actions } from "../constants";

const initialState = {
    methodCallType:0,
};

export function header_reducer(state = initialState, action) {
    switch (action.type) {
        case actions.CONTRACTCALL:
            return {
                ...state, 
                methodCallType:action.payload
            };
        default:
            return state
    }
}