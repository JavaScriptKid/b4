/**
 * aiSubmissionWatcher
 * Wait for submission queue to hit zero,
 * then submit all AI controlled combatant submissions
 */
import store from '../../init/store'
import {getDeadCombatantId} from '../get-dead-combatant-id'

export function aiSubmissionWatcher() {

    //I Don't Like This

    // var handleChange = function() {
    //     const history = store.getState().battle.history;
    //     const currentState = history[history.length - 1];
    //     const deadCombatant = getDeadCombatantId(currentState);
    //
    //     if (deadCombatant) {
    //         unsubscribe();
    //     } else {
    //         const submissions = store.getState().battle.submissions;
    //         if (submissions.length < 2) { //hard wired for 2 combatants
    //             console.log('DO A SUBMISSION');
    //         }
    //     }
    // };
    //
    // var unsubscribe = store.subscribe(handleChange)
    // handleChange()

}