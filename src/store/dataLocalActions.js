import { CREATE, DELETE, UPDATE } from "./dataLocalReducer"


export const dataLocalReducer = (state, {type, payload}) => {
    switch (type) {
        case CREATE:
            return {}
        case UPDATE:
            return {}
        case DELETE:
            return {}
        default:
            return state
    }
}
