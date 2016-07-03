import Actions from '../../_data/battle-actions'
import {CombatantModel} from '../combatant-model'

import {randomFromArray} from '../../helpers/random-from-array'


export function getSmartAttack(casterState, targetState, aiProperties={}) {
    /* TODO: build out this function to provide smart attack choice based on caster/target state and aiProperties */
    //-------------------------





    const casterModel = new CombatantModel( casterState );

    const actionId = randomFromArray(casterModel.attacks);
    const action = Actions[actionId];

    return {
        casterId: casterState.id,
        targetId: targetState.id,
        actionId: actionId,
        speedRoll: casterModel.speedRoll( action.speedModifier )
    }


}