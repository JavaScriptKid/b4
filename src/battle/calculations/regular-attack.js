export function getRegularAttackChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.affectTargetHpPoints != 0 || action.affectTargetHpPointsByPercent != 0) {

        if (action.repetitions.length) {
            //Do the roll [x,x] amount of times
            changes["repetitionsCount"] = 5;
            changes["affectTargetHp"] = -45;
        } else {

            // Point based strike
            if (action.affectTargetHpPoints != 0) {
                changes["affectTargetHp"] = action.affectTargetHpPoints; //Should be a proper roll?
            }
            // Percentage based strike
            if (action.affectTargetHpPointsByPercent != 0) {
                changes["affectTargetHp"] = Math.round(action.affectTargetHpPointsByPercent * targetState.maxHp);
            }
        }

    }


    /* HP RECOVERY */
    if (action.affectCasterHpPoints > 0) {
        const maxHp = casterState.maxHp;
        const hp = casterState.hp;
        const gain = ( hp + action.affectCasterHpPoints > maxHp )
            ? (maxHp - hp)
            : action.affectCasterHpPoints;

        changes["affectCasterHp"] = gain
    }

    return {
        ...currentChanges,
        ...changes
    }
}