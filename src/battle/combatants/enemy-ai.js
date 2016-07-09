import Actions from '../../_data/battle-actions'
import {CombatantModel} from '../combatant-model'

import {randomFromArray} from '../../helpers/random-from-array'


export function getSmartAttack(casterState, targetState, aiProperties={}, useDirectActionId=null, isSuperCharged) {
    /* TODO: build out this function to provide smart attack choice based on caster/target state and aiProperties */
    //-------------------------





    const casterModel = new CombatantModel( casterState );




    const actionId = useDirectActionId ? useDirectActionId : randomFromArray(casterModel.attacks);
    const action = Actions[actionId];

    const useSuperCharge = (isSuperCharged && casterModel.isDangerMeterUsable()); //quick validation

    return {
        casterId: casterState.id,
        targetId: targetState.id,
        actionId: actionId,
        isSuperCharged: useSuperCharge,
        speedRoll: casterModel.speedRoll( action.speedModifier )
    }


}