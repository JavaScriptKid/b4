import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import store from '../../init/store'
import {executeTurn} from '../execute-turn'
import {doStep} from '../do-step'

export function addSubmission(submissionModel) {
    if (!submissionModel) {
        console.warn("addSubmission called without a proper submissionModel", submissionModel)
    }
    setBattleValue({
        submissions: [
            ...store.getState().battle.submissions,
            submissionModel
        ]
    });

    /* EXECUTE THE TURN IF ALL ARE IN */
    if (store.getState().battle.submissions.length == 2) {
        const result = executeTurn(store.getState().battle.submissions);
        console.log(result);

        /* populate the Rollout Log with the steps! */
        setBattleValue({
            rollout: [...result.rolloutSteps],
            result: result
        });

        /* Run the first step! */
        setTimeout(() => {
            doStep();
        }, 500)
    }

}