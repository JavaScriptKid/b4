/**
 * =Submission model
 * Returns Submission with speed attached, ready for sorting
 */
import BattleActions from '../../_data/battle-actions'
import {CombatantModel} from '../combatant-model'
import store from '../../init/store'

export function SubmissionModel(actionId="", casterId="", targetId="") {

    const currentCasterState = store.getState().battle.history[
            store.getState().battle.history.length - 1
        ].combatants[casterId];

    const casterModel = new CombatantModel(currentCasterState);
    const actionSpeed = BattleActions[actionId].speedModifier;
    const speedRoll = casterModel.speedRoll(actionSpeed || 0);

    return {
        actionId: actionId,
        casterId: casterId,
        targetId: targetId,
        speedRoll: speedRoll
    }
}



/**
 * =getOrderedActionsFromSubmissions
 * Returns new array sorted by speedRoll
 * @param submissions
 * @returns {Array.<*>}
 */
export function getOrderedActionsFromSubmissions(submissions=[]) {
    return submissions.sort((a,b) => {
        return a.speedRoll < b.speedRoll ? 1 : -1
    })
}

