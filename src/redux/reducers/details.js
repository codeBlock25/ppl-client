import { STAFF } from "../types/details";

const initialstate = {
  staffDetails: {
    full_name: "",
    email: null,
    rank: null,
    phone_num: null,
    level: NaN,
  },
};

export const DetailsReducer = (state = initialstate, action) => {
  switch (action.type) {
    case STAFF:
      return {
        ...state,
        staffDetails: action.payload,
      };
    default:
      return { ...state };
  }
};
