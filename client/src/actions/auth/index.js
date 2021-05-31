import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";
import Axios from "../../services/axios/index";
import setAuthToken from "../../services/auth/setAuthToken";
import { toast } from "react-toastify";

// Signup User

export const signup = (data, history) => async (dispatch) => {
  const { name, surname, email, password } = data;
  try {
    const res = await Axios.post(`api/user/register`, {
      name,
      surname,
      email,
      password,
    });
    dispatch({
      type: REGISTER_SUCCESS,
    });
    history.push("/login");
    toast.success("Successfully Registered", { position: "top-center" });
    return res;
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User

export const login = (data, history) => async (dispatch) => {
  try {
    const { email, password } = data;
    const res = await Axios.post(`/api/user/login`, {
      email,
      password,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    history.push("/");
    return res;
  } catch (err) {
    console.log(err);
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await Axios.get("/api/user/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Logout

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
