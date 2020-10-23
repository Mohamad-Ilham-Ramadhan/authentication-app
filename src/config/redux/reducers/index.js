import { combineReducers } from "redux";

function initial(state = ["first", "second"], action) {
  switch (action.type) {
    default:
      return state;
  }
}

const reducer = combineReducers({ initial });

export default reducer;
