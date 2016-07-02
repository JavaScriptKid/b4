import store from '../../src/init/store'
import {getOrderedActionsFromSubmissions} from '../../src/battle/submissions/submission-utilities'
import {extractQueuedSubmissions, removeQueueSlot} from './cloud-queue'
import {setBattleValue} from '../redux-action-creators/battle-action-creators'
import {processActions} from './process-actions'

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

    /* 2. processActions() ? */
    //------------------------
    const result = processActions(actionQueue, lastHistoryEntry);

    /* Return the final result that will go into global state history */
    /* This can be clicked through by the client */
    return result;
}
