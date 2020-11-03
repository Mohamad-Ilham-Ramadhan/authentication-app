import { combineReducers } from "redux";
import user from "./user";
import loadings from "./loadings";
import messages from "./messages";
import auth from "./auth";

const reducer = combineReducers({ user, loadings, messages, auth });

export default reducer;
