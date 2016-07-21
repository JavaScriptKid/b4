import store from '../init/store'
import {doStep} from './do-step'
import {setLatestHistory, setCombatantValue} from '../redux-action-creators/battle-action-creators'
import {modelsFromObject} from '../helpers/models-from-object'
import {runEaseOut} from '../helpers/run-ease-out'

export function gradualStateChange(newState) {

    //1. Find the diffs that we should gradually change (like HP) and do that.
    const history = store.getState().battle.history;
    const currentState = history[history.length-1];

    const currentCombatants = modelsFromObject(currentState.combatants);
    const newCombatants = modelsFromObject(newState.combatants);


    var queue = [];

    if (currentCombatants[0].hp != newCombatants[0].hp) {
        //console.log('difference in 0');
        queue.push(
            {
                combatantId: currentCombatants[0]._id,
                wasHp: currentCombatants[0].hp,
                changeInStartValue: (currentCombatants[0].hp - newCombatants[0].hp) * -1,
            }
        )
    }

    if (currentCombatants[1].hp != newCombatants[1].hp) {
        //console.log('difference in 1')
        queue.push(
            {
                combatantId: currentCombatants[1]._id,
                wasHp: currentCombatants[1].hp,
                changeInStartValue: (currentCombatants[1].hp - newCombatants[1].hp) * -1,
            }
        )
    }


    var completed = 0;
    var handleDone = function() {
        completed += 1;
        if (completed == queue.length) {
            //Queue is complete. Blanket apply the updated state and move on with the next step.
            blanketApply(newState);
        }
    };

    if (queue.length > 0 ) {
        queue.forEach(q => {

            var handleIteration = function(newValue) {
                setCombatantValue(q.combatantId, {
                    hp: newValue
                });
            };

            if (q.changeInStartValue < 0) {
                setCombatantValue(q.combatantId, {
                    animation: "blink 0.3s steps(2, start) infinite"
                });
            }

            runEaseOut(q.wasHp, q.changeInStartValue, 120, handleIteration, handleDone)
        });

    } else {
        //2. No queue things to complete. Blanket apply the updated state and move on with the next step.
        blanketApply(newState);
    }

}


function blanketApply(newState) {




    //BUGFIX: Don't blanket apply Animation. Maybe this should be moved to the thing that gives us new state?
    var newCombatantState = {}; //newState.combatants;
    for (var combId in newState.combatants) {
        let model = {...newState.combatants[combId]};
        delete model.animation;
        newCombatantState[combId] = {...model};
    }

    const updatedState = {
        ...newState,
        combatants: {...newCombatantState}
    };

    setLatestHistory(updatedState);
    doStep(); //move forward to the next step
}
