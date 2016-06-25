import {getRegularAttackChanges} from './calculations/regular-attack'
import {getStatusChanges} from './calculations/change-status'
import {getPpChanges} from './calculations/change-pp'
import {getMiss} from './calculations/miss'
import {getSuperCharged} from './calculations/super-charge'

export default function(action, casterState, targetState) {
    let changes = {};

    /* Build up an object full of descriptive properties */
    changes = getSuperCharged(action, casterState, targetState, changes);
    changes = getPpChanges(action, casterState, targetState, changes);
    changes = getMiss(action, casterState, targetState, changes);
    changes = getRegularAttackChanges(action, casterState, targetState, changes);
    changes = getStatusChanges(action, casterState, targetState, changes);

    return {
        ...changes
    }

}