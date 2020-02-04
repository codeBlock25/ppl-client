import { NEWSTAFF, NEWCRIMINAL, NEWFIR } from "../types/controls"

const initialState = {
    newstaff_panel_open: false,
    newcriminal_panel_open: false,
    newfir_panel_open: false
}

export const controlsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case NEWSTAFF: return {
            newstaff_panel_open: !state.newstaff_panel_open
        }
        case NEWCRIMINAL: return {
            newcriminal_panel_open: !state.newcriminal_panel_open
        }
        case NEWFIR: return {
            newfir_panel_open: !state.newfir_panel_open
        }
        default: return {...state}
    }
}