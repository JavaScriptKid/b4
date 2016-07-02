import Actions from '../_data/battle-actions'
import {CombatantModel} from './combatant-model'
import {getStepDescriptionObject} from './get-step-description-object'
import {getStateChangesFromDescription} from './get-state-changes-from-description'
import {getMergedCombatantState} from './get-merged-combatant-state'
import {getUpdatedCloudQueue} from './get-updated-cloud-queue'

import {getStepOutput} from './get-step-output'


export function getRolloutStep(subaction, state) {

    const action = Actions[subaction.actionId];
    const casterModel = new CombatantModel(state.combatants[subaction.casterId]);
    const targetModel = new CombatantModel(state.combatants[subaction.targetId]);

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
        steps: stepOutput
    }

}

