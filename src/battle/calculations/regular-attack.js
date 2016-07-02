export function getRegularAttackChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.affectTargetHpPoints != 0 || action.affectTargetHpPointsByPercent > 0) {

        if (action.repetitions.length) {
            //Do the roll [x,x] amount of times
            changes["repetitionsCount"] = 5;
            changes["affectTargetHp"] = -45;
        } else {
            changes["affectTargetHp"] = action.affectTargetHpPoints; //Should be a proper roll?
        }

    }

    return {
        ...currentChanges,
        ...changes
    }
}