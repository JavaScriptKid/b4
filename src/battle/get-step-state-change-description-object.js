export default function(action, casterState, targetState) {
    let changes = {};

    /* Build up an object full of descriptive properties */

    if (action.affectTargetHpPoints > 0) {

        if (action.repetitions.length) {
            //Do the roll [x,x] amount of times
            changes.repetitionsCount = 5;
            changes.affectCasterHp = -45;
        } else {
            changes.affectCasterHp = action.affectTargetHpPoints * -1; //Should be a proper roll?
        }

    }


    return {
        ...changes
    }

}