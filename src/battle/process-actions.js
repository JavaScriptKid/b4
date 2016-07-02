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

            if (rolloutStep) {
                addStateLogToTurnHistory({...rolloutStep.nextState});
                addStepLogToRolloutHistory(rolloutStep.steps);

                /* Check if this rollout was the death of a character */
                const deathId = combatantHasDied(rolloutStep.nextState);
                if (deathId) {
                    const deathSubAction = {
                        casterId: deathId,
                        targetId: deathId,
                        actionId: "natural-death-a"
                    };
                    const deathRolloutStep = getRolloutStep(deathSubAction, rolloutStep.nextState);
                    addStateLogToTurnHistory({...deathRolloutStep.nextState});
                    addStepLogToRolloutHistory(deathRolloutStep.steps);
                }

            } else {
                /* Bouncer returned `null` */
            }
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


/**
 * Return combatantId who has died
 */
function combatantHasDied(newState) {
    var death = Object.keys(newState.combatants).map(cId => {
        const model = newState.combatants[cId];
        return model.hp <= 0 ? cId : null
    }).find(d => {
        return Boolean(d)
    });
    return death ? death : null;

}