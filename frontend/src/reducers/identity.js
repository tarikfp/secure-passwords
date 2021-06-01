import {
  DELETE_IDENTITY,
  GET_ALL_IDENTITY,
  GET_IDENTITY,
  CREATE_IDENTITY,
  SET_LOADING,
  UPDATE_IDENTITY,
} from "../actions/identity/types";

const initialState = {
  items: [],
  item: null,
  error: null,
  loading: true,
};

export default function identityStateManagement(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_IDENTITY:
      return {
        ...state,
        items: [...payload.identities],
        loading: false,
      };
    case GET_IDENTITY:
      return {
        ...state,
        item: payload.data,
        loading: false,
      };
    case CREATE_IDENTITY:
      return {
        ...state,
        items: [payload, ...state.items],
        loading: false,
      };
    case UPDATE_IDENTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === payload._id
            ? {
                ...item,
                title: payload.title,
                password: payload.password,
              }
            : item,
        ),
        loading: false,
      };
    case DELETE_IDENTITY:
      return {
        ...state,
        items: state.items.filter((x) => x._id !== payload),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
