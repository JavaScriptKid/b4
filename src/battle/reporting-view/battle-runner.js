import store from '../../init/store'
import {getSmartAttack} from '../combatants/enemy-ai'
import initBattleCombatants from '../init-battle-combatants'
import {getWinningCombatantId} from '../get-winning-combatant-id'
import {getDeadCombatantId} from '../get-dead-combatant-id'
import {executeTurn} from '../execute-turn'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'

// function initBattle(c1Properties, c2Properties) {
//     initBattleCombatants(
//         c1Properties,
//         c2Properties
//     );
// }


function runTurn() {

    const combs = store.getState().battle.history[ store.getState().battle.history.length-1 ].combatants;
    const player1Id = Object.keys(combs)[0];
    const player2Id = Object.keys(combs)[1];

    const submissions = [ /* Submission models */
        getSmartAttack(combs[player1Id], combs[player2Id], {}, null, null),
        getSmartAttack(combs[player2Id], combs[player1Id], {}, null, null)
    ];

    /* RUN 1 TURN */
    const result = executeTurn(submissions);

    setBattleValue({
        history: [
            ...store.getState().battle.history,
            result.nextState
        ],
        turnRolloutHistoryEntries: [
            ...store.getState().battle.turnRolloutHistoryEntries,
            {
                turnId: store.getState().battle.turnRolloutHistoryEntries.length,
                steps:result.rolloutSteps
            }
        ],
        devTimeTravelTurn: store.getState().battle.devTimeTravelTurn+1
    });

    return result;
}


export function runWholeBattle(c1Properties, c2Properties, currentProgress, callback) {



    initBattleCombatants(
        {
            ...c1Properties
        },
        {
            ...c2Properties
        }
    );


    var run = () => {
        const result = runTurn();
        if ( !getDeadCombatantId(result.nextState) ) {
            setTimeout(function() {
                run();
            }, 10)
        } else {
            const winner = getWinningCombatantId(result.nextState);
            //console.log(result.nextState)
            console.log('BATTLE OVER!', winner);


            callback([...currentProgress, winner]);
        }
    };
    run();
}