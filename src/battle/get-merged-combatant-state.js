/**
 * Merge nextStateChanges in to currentState to produce the full nextState
 *
*/

export function getMergedCombatantState(nextStateChanges, currentState) {
    var nextState = {};

    Object.keys(currentState).forEach(key => {
        nextState[key] = {
            ...currentState[key],
            ...nextStateChanges[key],
        }
    });

    return nextState;

}