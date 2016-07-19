import store from '../init/store'
import {setBattleValue} from '../redux-action-creators/battle-action-creators'

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

    //Delete this step
    const reducedRollout = rollout.filter((step,i) => {return i > 0});
    setBattleValue({
        rollout: reducedRollout
    });

    //Reset the submissions if we are done rolling out
    if (reducedRollout.length == 0) {
        console.log('TURN IS OVER')
        setBattleValue({
            submissions: []
        });
    }


    //Auto run the next step if this is a stateChange
    if (nowStep.type == "stateChange" && reducedRollout.length > 0) {
        doStep();
    }
}