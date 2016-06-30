import store from '../../src/init/store'
import {getOrderedActionsFromSubmissions} from '../../src/battle/submissions/submission-utilities'
import {extractQueuedSubmissions, removeQueueSlot} from '../../src/battle/event-loop/cloud-queue'
import {setBattleValue} from '../redux-action-creators/battle-action-creators'

/**
 * =executeTurn
 * Go from submissions to result output
 */
export function executeTurn(submissionModels=[]) {

    const lastHistoryEntry = store.getState().battle.history[store.getState().battle.history.length-1];

    const actionQueue = [
        ...extractQueuedSubmissions(lastHistoryEntry.cloudQueue), //Need a test that proves this adds these
        ...getOrderedActionsFromSubmissions(submissionModels)
    ];

    console.log(actionQueue)

    setBattleValue({
        queueCloud: removeQueueSlot( store.getState().battle.queueCloud )
    });
}
