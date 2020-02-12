import { NEWSTAFF, NEWCRIMINAL, NEWFIR, NEWCRIMERECORD } from "../types/controls"


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
export const newcrimerecordAction = () => {
    return {
        type: NEWCRIMERECORD,
        info: "handle newstaff controls"
    }
}