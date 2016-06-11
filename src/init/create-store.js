import { createStore, applyMiddleware, combineReducers } from 'redux'
import * as mapReducer from '../redux-reducers/map-reducer'
import * as battleReducer from '../redux-reducers/battle-reducer'
import * as playerDataReducer from '../redux-reducers/player-data-reducer'

export default function(data) {
    var reducer = combineReducers({
        ...battleReducer,
        ...playerDataReducer,
        ...mapReducer,
    });


    if (typeof window == "object") {
        var store = createStore(reducer, data,
            window.devToolsExtension ? window.devToolsExtension() : undefined
        );
    } else {
        var store = createStore(reducer, data);
    }

    return store
}