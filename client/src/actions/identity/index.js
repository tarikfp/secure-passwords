import {
  DELETE_IDENTITY,
  GET_ALL_IDENTITY,
  GET_IDENTITY,
  IDENTITY_ACTION_FAIL,
  IDENTITY_ACTION_SUCCESS,
} from "./types";
import Axios from "../../services/axios/index";
import { toast } from "react-toastify";

// Create Identity

export const createIdentity = (data) => async (dispatch) => {
  const { title, password } = data;
  try {
    const res = await Axios.post(`api/identity`, {
      title,
      password,
    });
    dispatch({
      type: IDENTITY_ACTION_SUCCESS,
    });
    toast.success("Identity successfully created", { position: "top-center" });
    return res;
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    }
    dispatch({
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Delete Identity

export const deleteIdentity = (data) => async (dispatch) => {
  try {
    await Axios.delete(`/api/identity/${data.id}`);
    dispatch({
      type: DELETE_IDENTITY,
    });
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    }
    dispatch({
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Get All Identities

export const getAllIdentity = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/identity");
    dispatch({
      type: GET_ALL_IDENTITY,
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
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Get Identity

export const getIdentity = (data) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/identity${data.id}`);
    dispatch({
      type: GET_IDENTITY,
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
      type: IDENTITY_ACTION_FAIL,
    });
  }
};
