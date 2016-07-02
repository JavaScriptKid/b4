/**
 * Merge nextStateChanges in to currentState to produce the full nextState
 *
*/

export function getMergedCombatantState(nextStateChanges, currentState) {

    var nextCombatants = {};

    Object.keys(currentState.combatants).forEach(key => {
        nextCombatants[key] = {
            ...currentState.combatants[key],
            ...nextStateChanges.combatants[key],
        }
    });

    return {
        ...currentState,
        ...nextStateChanges,
        combatants: {
            ...currentState.combatants,
            ...nextCombatants
        }
    };

}