import { combineReducers } from "redux";
import user from "./user";
import loadings from "./loadings";
import messages from "./messages";
import auth from "./auth";
import firstMount from "./firstMount";

const reducer = combineReducers({ user, loadings, messages, auth, firstMount });

export default reducer;
