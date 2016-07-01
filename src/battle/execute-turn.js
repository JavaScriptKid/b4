import store from '../../src/init/store'
import {getOrderedActionsFromSubmissions} from '../../src/battle/submissions/submission-utilities'
import {extractQueuedSubmissions, removeQueueSlot} from '../../src/battle/event-loop/cloud-queue'
import {setBattleValue} from '../redux-action-creators/battle-action-creators'

/**
 * =executeTurn
 * Go from submissions to result output
 */
export function executeTurn(submissionModels=[]) {

    /* 1. Assemble the Queue */
    //------------------------
    const lastHistoryEntry = store.getState().battle.history[store.getState().battle.history.length-1];
    const actionQueue = [
        ...extractQueuedSubmissions(lastHistoryEntry.cloudQueue), //Need a test that proves this adds these
        ...getOrderedActionsFromSubmissions(submissionModels)
    ];
    
    setBattleValue({ /* Remove this turn from the queue */
        queueCloud: removeQueueSlot( store.getState().battle.queueCloud )
    });

    console.log(actionQueue);

    /* 2. processActions() ? */
    //------------------------
}
