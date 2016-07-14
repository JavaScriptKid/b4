/**
 * =getSubmission
 * Take in actionId, get back a true Submission object.
 * Assumes 1 on 1, and auto selects other combatant as target.
 * THIS IS ONLY FOR THE PLAYER COMBATANT. Enemy AI should use Enemy AI function
 */

import store from '../../init/store';
import {CombatantModel} from '../combatant-model'
import Actions from '../../_data/battle-actions'

export function getSubmission(actionId, useFramework=null) {
    const history = store.getState().battle.history;
    const combs = history[ history.length-1 ].combatants;

    const playerId = Object.keys(combs)[0];
    const enemyId = Object.keys(combs)[1];
    const playerModel = new CombatantModel(combs[playerId]);
    const actionModel = Actions[actionId];

    return {
        casterId: playerId,
        targetId: enemyId,
        actionId: actionId,
        superChargedFrameworkId: useFramework,
        speedRoll: playerModel.speedRoll( actionModel.speedModifier )
    }

}