import { combineReducers } from "redux";
import { controlsReducer } from "./reducers/controls";
import { DetailsReducer } from "./reducers/details";

const reducer = combineReducers({
  controls: controlsReducer,
  details: DetailsReducer,
});

export default reducer;
