import {
  CREATE_IDENTITY,
  DELETE_IDENTITY,
  GET_ALL_IDENTITY,
  UPDATE_IDENTITY,
  GET_IDENTITY,
  IDENTITY_ACTION_FAIL,
  SET_LOADING,
} from "./types";
import Axios from "../../services/axios/index";
import { toast } from "react-toastify";
import { handleManyRequest } from "../../infrastructure/handleManyRequest";
import { serverURL } from "../../infrastructure/ServerConfig";

// Create Identity

export const createIdentity = (data) => async (dispatch) => {
  const { title, password } = data;
  try {
    const res = await Axios.post(`${serverURL}/api/identity`, {
      title,
      password,
    });
    dispatch({
      type: CREATE_IDENTITY,
      payload: res.data,
    });
    toast.success("Identity successfully created", { position: "top-center" });
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    } else {
      toast.error("An Error Occured", {
        position: "top-center",
        toastId: "an-error-occured",
      });
    }
    dispatch({
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Delete Identity

export const deleteIdentity = (id) => async (dispatch) => {
  try {
    await Axios.delete(`${serverURL}/api/identity/${id}`);
    dispatch({
      type: DELETE_IDENTITY,
      payload: id,
    });
    toast.success("Identity successfully deleted", { position: "top-center" });
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    } else {
      toast.error("An Error Occured", {
        position: "top-center",
        toastId: "an-error-occured",
      });
    }
    dispatch({
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Update Identity

export const updateIdentity = (data) => async (dispatch) => {
  try {
    const res = await Axios.put(`${serverURL}/api/identity`, data);
    dispatch({
      type: UPDATE_IDENTITY,
      payload: res.data,
    });
    toast.success("Identity successfully updated", { position: "top-center" });
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-center" }),
      );
    } else {
      toast.error("An Error Occured", {
        position: "top-center",
        toastId: "an-error-occured",
      });
    }
    dispatch({
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Get All Identities

export const getAllIdentity = (isRefresh) => async (dispatch) => {
  try {
    const res = await Axios.get(`${serverURL}/api/identity/identity`);
    dispatch(setIdentityLoading());
    if (res && isRefresh) {
      toast.success("Identity list successfully refreshed", {
        position: "top-center",
      });
    }
    dispatch({
      type: GET_ALL_IDENTITY,
      payload: res.data,
    });
  } catch (err) {
    handleManyRequest(err.response);
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
    const res = await Axios.get(
      `${serverURL}/api/identity/identity/${data.id}`,
    );
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
    } else {
      toast.error("An Error Occured", {
        position: "top-center",
        toastId: "an-error-occured",
      });
    }
    dispatch({
      type: IDENTITY_ACTION_FAIL,
    });
  }
};

// Refresh Loading

export const setIdentityLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
