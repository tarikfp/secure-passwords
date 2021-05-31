import { combineReducers } from "redux";
import auth from "./auth";
import identity from "./identity";

export default combineReducers({
  auth,
  identity,
});
