/**
 * Do the calculations and contruct a helpful description of properties that lets us construct the Rollout Step
 */

import {getRegularAttackChanges} from './calculations/regular-attack'
import {getStatusChanges} from './calculations/change-status'
import {getPpChanges} from './calculations/change-pp'
import {getMiss} from './calculations/miss'
import {getSuperCharged} from './calculations/super-charge'
import {getExtraActionAdds} from './calculations/extra-action-adds'
import {getUpdatedItemsList} from './calculations/updated-items-list'

export function getStepDescriptionObject(action, casterModel, targetModel) {
    let changes = {
        casterId: casterModel.id,
        targetId: targetModel.id
    };



    /* Build up an object full of descriptive properties */
    changes = getSuperCharged(action, casterModel, targetModel, changes);
    changes = getPpChanges(action, casterModel, targetModel, changes);
    changes = getMiss(action, casterModel, targetModel, changes);
    changes = getRegularAttackChanges(action, casterModel, targetModel, changes);
    changes = getStatusChanges(action, casterModel, targetModel, changes);
    changes = getExtraActionAdds(action, casterModel, targetModel, changes);
    changes = getUpdatedItemsList(action, casterModel, targetModel, changes);


    return {
        ...changes
    }

}