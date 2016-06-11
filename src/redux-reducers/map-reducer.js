import { setValue } from '../helpers/reducer-utilities'

export function map(state = {}, action) {

    switch(action.type) {

        case "SET_MAP_VALUE":
            return setValue(state, action.payload.changes);

        case "SET_VIEWPORT_SIZE":
            return {
                viewportWidth: action.width,
                viewportHeight: action.height
            };

        default:
            return state;
    }
}
