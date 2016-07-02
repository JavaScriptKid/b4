import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './init/store';
import Viewport from './viewport/viewport'
import initBattleCombatants from './battle/init-battle-combatants'


/* DEV ONLY */
import {executeTurn} from './battle/execute-turn'
import {setBattleValue} from './redux-action-creators/battle-action-creators'

var RootComponent = React.createClass({

    componentWillMount() {
        /* B4 demo only. */
        //Seed the battle
        initBattleCombatants();

        /* TODO: ONLY DEGBUGGING HERE! KICK OFF A TURN FOR DEV LOGGING. THIS WHOLE THING WILL GO AWAY EXCEPT THE INIT^ */

        const combs = store.getState().battle.history[0].combatants;
        const player1Id = Object.keys(combs)[0];
        const player2Id = Object.keys(combs)[1];
        const submissions = [ /* Submission models */
            {
                casterId: player1Id,
                targetId: player2Id,
                actionId: "attack-001-a",
                speedRoll: 3
            },
            {
                casterId: player2Id,
                targetId: player1Id,
                actionId: "attack-002-a",
                speedRoll: 99
            }
        ];

        /* RUN A FEW TURNS */
        [1].forEach(i => {
            const result = executeTurn(submissions);
            console.log(result);
            //FOR NOW
            setBattleValue({
                history: [
                    ...store.getState().battle.history,
                    result.nextState
                ]
            })
        });




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