import {getRolloutStep} from './get-rollout-step'
export function processActions(actionQueue=[], initialState={}) {

    /* Set up initial Turn history and helpers */
    var stateHistory = [ initialState ];

    var addStateLogToTurnHistory = function(newState={}) {
        stateHistory.push(newState);
    };

    var getLatestState = function() {
        return { ...stateHistory[stateHistory.length - 1] }
    };

    /* Rollout history */
    var rolloutStepHistory = [];
    var addStepLogToRolloutHistory = function(newStep=[]) {
        rolloutStepHistory = [
            ...rolloutStepHistory,
            ...newStep
        ]
    };

    /* Begin the loop */
    actionQueue.forEach(a => {

        const state = getLatestState();


        /* Break actions into subactions */
        const subactions = getSubactions(a, state.combatants[a.casterId]);


        subactions.forEach(subaction => {
            const state = getLatestState();
            const rolloutStep = getRolloutStep(subaction, state);
            addStateLogToTurnHistory({ ...rolloutStep.nextState });
            addStepLogToRolloutHistory( rolloutStep.steps )
        });

    });

    /* Return the next state after these actions */
    return {
        rolloutSteps: rolloutStepHistory,
        nextState: getLatestState()
    }

}


/**
 * Include extra stuff that happen before or after the intent
 */
export function getSubactions(action, combatantState) {

    /* Case 1: suffering from a memory leak */
    if (combatantState.status == "memory-leak") {
        return [
            action,
            {

                casterId: action.casterId,
                targetId: action.targetId,
                actionId: "natural-memoryleak-a" //TODO: make this a real action
            }
        ]
    }

    return [action];
}