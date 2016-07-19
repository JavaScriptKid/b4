import store from '../init/store'
import {setBattleValue, setLatestHistory} from '../redux-action-creators/battle-action-creators'

export function doStep() {
    const rollout = store.getState().battle.rollout;

    //console.log('RUN');

    if (rollout.length == 0) {
        /* Fail safe */
        return;
    }

    const nowStep = rollout[0];
    console.log(nowStep);

    //Do the step.
    if (nowStep.type == "message") {
        setBattleValue({
            textMessageContent: nowStep.content
        })
    }

    if (nowStep.type == "animation") {
        //TODO
        setBattleValue({
            textMessageContent: ["**ANIMATION**"]
        })
    }

    if (nowStep.type == "stateChange") {
        setLatestHistory(nowStep.newState)
    }

    //Delete this step
    const reducedRollout = rollout.filter((step,i) => {return i > 0});
    setBattleValue({
        rollout: reducedRollout
    });

    //Reset the submissions if we are done rolling out
    if (reducedRollout.length == 0) {

        handleEndOfTurn();

        setBattleValue({
            submissions: []
        });
    }


    //Auto run the next step if this is a stateChange
    if (nowStep.type == "stateChange" && reducedRollout.length > 0) {
        doStep();
    }
}


var handleEndOfTurn = function() {

    const history = store.getState().battle.history;
    const result = store.getState().battle.result;
    const turnRolloutHistoryEntries = store.getState().battle.turnRolloutHistoryEntries;
    const devTimeTravelTurn = store.getState().battle.devTimeTravelTurn;

    //We are rolled out, so update State and Rollout history with the preserved result

    setBattleValue({
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
    })
};