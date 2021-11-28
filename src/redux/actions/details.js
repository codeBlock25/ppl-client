import { STAFF } from "../types/details";

export const staffDetailsAction = (payload) => {
  return {
    type: STAFF,
    info: "hold staff details",
    payload: payload,
  };
};
