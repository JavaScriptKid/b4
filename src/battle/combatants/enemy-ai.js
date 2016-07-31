import Actions from '../../_data/battle-actions'
import {CombatantModel} from '../combatant-model'
import {getTraitPathChoice} from './get-trait-path-choice'
import {randomFromArray} from '../../helpers/random-from-array'


export function getSmartAttack(casterState, targetState, aiProperties={}, useDirectActionId=null, superChargedFrameworkId=null) {

    const casterModel = new CombatantModel( casterState );
    const targetModel = new CombatantModel( targetState );

    if (casterModel.isComputerControlled && !useDirectActionId) {
        const smartAttack = getTraitPathChoice(casterModel.computerAiTraits, casterModel, targetModel);
        const action = Actions[smartAttack.actionId];

        return {
            ...smartAttack,
            speedRoll: casterModel.speedRoll( action.speedModifier )
        }
    }


    //Hopefully all of the below will go away
    // If not computer controlled, use the supplied actionId or a random one
    const actionId = useDirectActionId ? useDirectActionId : randomFromArray(casterModel.attacks);
    const action = Actions[actionId];

    const useFramework = (superChargedFrameworkId && casterModel.isDangerMeterUsable()) ? superChargedFrameworkId : null; //quick validation

    return {
        casterId: casterState.id,
        targetId: targetState.id,
        actionId: actionId,
        superChargedFrameworkId: useFramework,
        speedRoll: casterModel.speedRoll( action.speedModifier )
    }


}

import store from '../../init/store'

export function getAutoAttacks() {
    const history = store.getState().battle.history;
    const combs = history[history.length-1].combatants;

    const combModels = Object.keys(combs).map(combId => {
        return combs[combId];
    });

    //Fill array with computerControlled attacks, hard coded for 2 combatants:
    var autoAttacks = [];

    if (combModels[0].isComputerControlled) {
        autoAttacks.push(
            getSmartAttack(combModels[0], combModels[1], {}, null, null)
        )
    }
    if (combModels[1].isComputerControlled) {
        autoAttacks.push(
            getSmartAttack(combModels[1], combModels[0], {}, null, null)
        )
    }

    return autoAttacks;



}