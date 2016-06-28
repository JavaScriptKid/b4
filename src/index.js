import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

////TRYING SOMETHING
//import {battle} from './redux-reducers/battle-reducer'

import store from './init/store';
import Viewport from './viewport/viewport'
import initBattleCombatants from './battle/init-battle-combatants'

var RootComponent = React.createClass({

    componentWillMount() {
        /* B4 demo only. */
        //Seed the battle
        initBattleCombatants();

        //console.log(store.getState().battle.viewMode);
        //
        //const nextState = battle( store.getState().battle, {
        //    type: "SET_BATTLE_VALUE",
        //    payload: {
        //        changes: {
        //            viewMode: "something else"
        //        }
        //    }
        //})
        //
        //console.log(nextState)
        //console.log(store.getState().battle.viewMode);



    },

    render() {
        return (
            <Provider store={ this.props.store }>
                <Viewport />
            </Provider>
        );
    }
});

var rootInstance = null;

rootInstance = render(<RootComponent store={store} />, document.getElementById('app-root'));

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            // Help React Hot Loader figure out the root component instances on the page:
            return [rootInstance];
        }
    });
}