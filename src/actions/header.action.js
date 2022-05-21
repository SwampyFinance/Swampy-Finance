import { actions } from "../constants";

export const headerActions = {
    headerUpdateTrigger
};

function headerUpdateTrigger(val) {
    return dispatch => dispatch({ type: actions.CONTRACTCALL, payload: val });
}