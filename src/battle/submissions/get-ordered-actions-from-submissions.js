import BattleActions from '../../_data/battle-actions'
import {CombatantModel} from '../combatant-model'


/* TODO: write unit test, even though this function isn't totally pure */
export function getOrderedActionsFromSubmissions(submissions=[], combatantsState) {
    var orderedSubmissions = submissions.map(Submission => {
        const caster = new CombatantModel( combatantsState[Submission.casterId] );
        const actionSpeed = BattleActions[ Submission.actionId ].speed;

        return {
            ...Submission,
            speedRoll: caster.speedRoll(actionSpeed)
        }

    });
    return orderedSubmissions.sort((a,b) => { return a.speedRoll - b.speedRoll } )
}

