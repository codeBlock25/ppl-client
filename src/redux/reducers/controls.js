import {
  NEWSTAFF,
  NEWCRIMINAL,
  NEWFIR,
  NEWCRIMERECORD,
} from "../types/controls";

const initialState = {
  newstaff_panel_open: false,
  newcriminal_panel_open: false,
  newfir_panel_open: false,
  newcrimerecord_panel_open: false,
};

export const controlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWSTAFF:
      return {
        ...state,
        newstaff_panel_open: !state.newstaff_panel_open,
      };
    case NEWCRIMINAL:
      return {
        ...state,
        newcriminal_panel_open: !state.newcriminal_panel_open,
      };
    case NEWFIR:
      return {
        ...state,
        newfir_panel_open: !state.newfir_panel_open,
      };
    case NEWCRIMERECORD:
      return {
        ...state,
        newcrimerecord_panel_open: !state.newcrimerecord_panel_open,
      };
    default:
      return { ...state };
  }
};
