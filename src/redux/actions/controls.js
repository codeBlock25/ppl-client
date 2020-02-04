import { NEWSTAFF, NEWCRIMINAL, NEWFIR } from "../types/controls"
import NewStaff from "../../components/newstaff"


export const newstaffAction = () => {
    return {
        type: NEWSTAFF,
        info: "handle newstaff controls"
    }
}
export const newcriminalAction = () => {
    return {
        type: NEWCRIMINAL,
        info: "handle new criminal controls"
    }
}
export const newfirAction = () => {
    return {
        type: NEWFIR,
        info: "handle newstaff controls"
    }
}