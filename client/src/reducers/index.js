import { combineReducers } from "redux";
import auth from "./auth";
import identity from "./identity";
import config from "./config";

export default combineReducers({
  auth,
  identity,
  config,
});
