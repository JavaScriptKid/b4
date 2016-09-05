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
    const history = store.getState().battle.history;
    const lastHistoryEntry = history[history.length-1];
    const actionQueue = [
        ...extractQueuedSubmissions(lastHistoryEntry.cloudQueue),
        ...getOrderedActionsFromSubmissions(submissionModels)
    ];

    /* Make version of state with updated Queue to use as initialState in processActions */
    const historyWithUpdatedQueue = {
        cloudQueue: removeQueueSlot( lastHistoryEntry.cloudQueue ),
        combatants: {...lastHistoryEntry.combatants },
        currentTurnIndex: history.length
    };

    /* 2. processActions() */
    //------------------------
    const result = processActions(actionQueue, historyWithUpdatedQueue);

    /* Return the final result that will go into global state history */
    /* This can be clicked through by the client */
    return result;
}
