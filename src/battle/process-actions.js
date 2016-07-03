import {getRolloutStep} from './get-rollout-step'
import {getDeadCombatantId} from './get-dead-combatant-id'

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
                const deathId = getDeadCombatantId(rolloutStep.nextState);
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

import Actions from '../_data/battle-actions'
export function getSubactions(action, combatantState) {


    /* Part time bouncer: cancel this attack and it's additional sub actions if the status is not relevant */
    /* Cancel if move is dependent on status.
    EX: don't recover from lag if you're not lagging, and don't get the memory-leak penalty when using the recover action */
    const actionModel = Actions[action.actionId];
    if (actionModel.dependentOnCasterStatus && actionModel.dependentOnCasterStatus != combatantState.status) {
        return [];
    }


    /* Case 1: suffering from a memory leak */
    if (combatantState.status == "memory-leak") {
        return [
            action,
            {
                casterId: action.casterId,
                targetId: action.casterId,
                actionId: "natural-memory-leak-a"
            }
        ]
    }

    /* Case 2: suffering from fire */
    if (combatantState.status == "fire") {
        return [
            action,
            {
                casterId: action.casterId,
                targetId: action.casterId,
                actionId: "natural-fire-a"
            }
        ]
    }

    return [action];
}
