import store from '../init/store'

export default function(changes={}) {
    store.dispatch({
        type: "SET_PAUSE_MENU_VALUE",
        payload: {
            changes: {...changes}
        }
    });
}