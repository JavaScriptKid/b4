import store from '../init/store'
import {doStep} from './do-step'
import {setLatestHistory, setCombatantValue} from '../redux-action-creators/battle-action-creators'
import {modelsFromObject} from '../helpers/models-from-object'
import {runEaseOut} from '../helpers/run-ease-out'
import {sfxBabum} from '../_data/_sfx'


export function gradualStateChange(rawNewState) {

    const newState = removeAnimationFromState(rawNewState);
    //console.log('nS', newState)

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
                sfxBabum.play();

            }

            runEaseOut(q.wasHp, q.changeInStartValue, 120, handleIteration, handleDone)
        });

    } else {
        //2. No queue things to complete. Blanket apply the updated state and move on with the next step.
        blanketApply(newState);
    }

}


function blanketApply(newState) {

    const updatedState = removeAnimationFromState(newState);

    setLatestHistory(updatedState);
    doStep(); //move forward to the next step
}


export function removeAnimationFromState(newState) {

    const history = store.getState().battle.history;
    const currentState = history[history.length-1];


    //Don't blanket apply Animation. Use the previous animation value.
    var newCombatantState = {};
    for (var combId in newState.combatants) {
        let model = {...newState.combatants[combId]};

        const currentAnimation = currentState.combatants[combId].animation;

        //model.animation = currentState.combatants[combId].animation; //Carries over animation from previous state

        model.animation = currentAnimation.match(/blink/) ? "initial" : currentAnimation;

        newCombatantState[combId] = {...model};
    }

    return {
        ...newState,
        combatants: {...newCombatantState}
    };
}

