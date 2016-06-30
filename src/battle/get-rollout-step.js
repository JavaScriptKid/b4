import Actions from '../_data/battle-actions'
import {CombatantModel} from './combatant-model'
import {getStepDescriptionObject} from './get-step-description-object'
import {getStateChangesFromDescription} from './get-state-changes-from-description'
import {getMergedCombatantState} from './get-merged-combatant-state'

import {getStepOutput} from './get-step-output'


export function getRolloutStep(subaction, state) {
    const action = Actions[subaction.actionId];
    const casterModel = new CombatantModel(subaction.casterId);
    const targetModel = new CombatantModel(subaction.targetId);

    const stepDescriptionObject = getStepDescriptionObject(action, casterModel, targetModel);
    const stepOutput = getStepOutput(action, casterModel, targetModel, stepDescriptionObject);
    const stateChanges = getStateChangesFromDescription(stepDescriptionObject, state);

    
    return {
        nextState: getMergedCombatantState(stateChanges, state),
        rolloutSteps: stepOutput
    }

}

