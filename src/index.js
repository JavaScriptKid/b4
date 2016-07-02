import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './init/store';
import Viewport from './viewport/viewport'
import initBattleCombatants from './battle/init-battle-combatants'

var RootComponent = React.createClass({

    componentWillMount() {
        /* B4 demo only. */
        //Seed the battle
        initBattleCombatants();
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