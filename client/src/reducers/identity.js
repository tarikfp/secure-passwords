import {
  DELETE_IDENTITY,
  GET_ALL_IDENTITY,
  GET_IDENTITY,
  CREATE_IDENTITY,
  SET_LOADING,
} from "../actions/identity/types";

const initialState = {
  items: [],
  item: null,
  error: null,
  loading: true,
};

export default function stateManagement(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_IDENTITY:
      return {
        ...state,
        items: payload.data,
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
        items: [payload.data, ...state.items],
        loading: false,
      };
    case DELETE_IDENTITY:
      return {
        ...state,
        items: state.items.filter((x) => x.id !== payload.id),
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
