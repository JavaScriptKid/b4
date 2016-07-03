import Actions from '../_data/battle-actions'
import {CombatantModel} from './combatant-model'
import {getStepDescriptionObject} from './get-step-description-object'
import {getStateChangesFromDescription} from './get-state-changes-from-description'
import {getMergedCombatantState} from './get-merged-combatant-state'
import {getUpdatedCloudQueue} from './get-updated-cloud-queue'

import {getStepOutput} from './get-step-output'
import {getDeadCombatantId} from './get-dead-combatant-id'
import {getReplacedActionIdMiddleware} from './get-replaced-action-id'

export function getRolloutStep(subaction, state) {


    const casterModel = new CombatantModel(state.combatants[subaction.casterId]);
    const targetModel = new CombatantModel(state.combatants[subaction.targetId]);

    const actionId = getReplacedActionIdMiddleware(subaction.actionId, casterModel)
    const action = Actions[actionId];


    /* -- Bouncer -- */
    /* cancel if caster is dead, unless this is the "die" action */
    if (getDeadCombatantId(state)) {
        if (subaction.actionId != "natural-death-a") {
            return null;
        }
    }



    const stepDescriptionObject = getStepDescriptionObject(action, casterModel, targetModel);
    const stepOutput = getStepOutput(action, casterModel, targetModel, stepDescriptionObject);
    const stateChanges = getStateChangesFromDescription(stepDescriptionObject, state.combatants);

    const cloudQueue = getUpdatedCloudQueue(stepDescriptionObject, state.cloudQueue);

    const nextState = getMergedCombatantState({
        cloudQueue: cloudQueue, /* TODO: how do cloud changes get merged into nextState? */
        combatants: stateChanges
    }, state);


    return {
        nextState: nextState,
        steps: [
            ...stepOutput,
            {type: "stateChange", newState: nextState} //The view clickthrough should dispatch this
        ]
    }

}

