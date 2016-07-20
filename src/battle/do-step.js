import store from '../init/store'
import {setBattleValue, setLatestHistory, setCombatantValue} from '../redux-action-creators/battle-action-creators'
import {gradualStateChange} from './gradual-state-change'
import {turnCombatantsForSubmissions} from './arena-view/turn-combatants'

export function doStep() {
    const rollout = store.getState().battle.rollout;

    //console.log('RUN');

    if (rollout.length == 0) {
        /* Rollout queue is empty -> go to end of turn */
        handleEndOfTurn();
        return;
    }

    const nowStep = rollout[0];
    //console.log(nowStep);

    //Delete this step
    const reducedRollout = rollout.filter((step,i) => {return i > 0});
    setBattleValue({
        rollout: reducedRollout
    });

    //Do the step.
    if (nowStep.type == "message") {

        setBattleValue({
            textMessageContent: []
        });

        //setTimeout(function() {
            setBattleValue({
                textMessageContent: nowStep.content
            })
        //}, 10)
    }

    if (nowStep.type == "animation") {

        if (!nowStep.actionDescription) {
            console.warn('no actionDescription found for', nowStep)
        }
        //console.log(nowStep)
        setBattleValue({
            currentAnimation: {
                animationId: nowStep.animationName,
                actionDescription: nowStep.actionDescription
            }
        })
    }

    if (nowStep.type == "stateChange") {
        gradualStateChange(nowStep.newState);
        //setLatestHistory(nowStep.newState)
    }

}


var handleEndOfTurn = function() {

    const history = store.getState().battle.history;
    const result = store.getState().battle.result;
    const turnRolloutHistoryEntries = store.getState().battle.turnRolloutHistoryEntries;
    const devTimeTravelTurn = store.getState().battle.devTimeTravelTurn;

    //We are rolled out, so update State and Rollout history with the preserved result
    setBattleValue({
        textMessageContent: [],
        submissions: [],
        history: [
            ...history,
            result.nextState
        ],
        turnRolloutHistoryEntries: [
            ...turnRolloutHistoryEntries,
            {
                turnId: turnRolloutHistoryEntries.length,
                steps:result.rolloutSteps
            }
        ],
        devTimeTravelTurn: devTimeTravelTurn+1
    });

    //console.log('END OF TURN - TURN')
    turnCombatantsForSubmissions();

};