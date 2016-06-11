import { setValue } from '../helpers/reducer-utilities'

export function battle(state = {}, action) {
    switch (action.type) {
        case "SET_AUTHENTICATION_VALUE":
            return setValue(state, action.payload.changes);
        default:
            return state;
    }
}