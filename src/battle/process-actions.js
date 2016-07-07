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

                /* ADDING EXTRA SUB EVENTS ON THIS SAME TURN */
                /* Case 1. Steal and Use */
                if (rolloutStep.stepDescriptionObject.shouldImmediatelyUse) {
                    const useItemSubAction = {
                        casterId: a.casterId,
                        targetId: a.casterId,
                        actionId: rolloutStep.stepDescriptionObject.shouldImmediatelyUse
                    };
                    const useItemStolenItemRolloutStep = getRolloutStep(useItemSubAction, rolloutStep.nextState);
                    addStateLogToTurnHistory({...useItemStolenItemRolloutStep.nextState});
                    addStepLogToRolloutHistory(useItemStolenItemRolloutStep.steps);
                }

                /* Case 2. Check if this rollout was the death of a character */
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
    EX: don't recover from lag if you're not lagging */
    // const actionModel = Actions[action.actionId];
    // if (actionModel.dependentOnCasterStatus && actionModel.dependentOnCasterStatus != combatantState.status) {
    //     return [];
    // }
    /* TODO: I moved this logic to 'get-rollout-step.js' where it belongs */
    /* TODO: IF no bugs pop up, delete all these comments */


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
