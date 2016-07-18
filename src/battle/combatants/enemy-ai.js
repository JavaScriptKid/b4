import Actions from '../../_data/battle-actions'
import {CombatantModel} from '../combatant-model'

import {randomFromArray} from '../../helpers/random-from-array'


export function getSmartAttack(casterState, targetState, aiProperties={}, useDirectActionId=null, superChargedFrameworkId=null) {
    /* TODO: build out this function to provide smart attack choice based on caster/target state and aiProperties */
    //-------------------------

    const casterModel = new CombatantModel( casterState );
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
    //    .filter(model => {
    //    return model.isComputerControlled
    //});

    //Hard coding this for now. I don't see a lot of value in making it so fluid unless there are more than 2 combatants

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