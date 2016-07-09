export function getDangerMeter(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.increaseDangerMeter > 0) {

        /* Add action's increase to caster's danger meter */
        const actionDangerIncrease = action.increaseDangerMeter;
        /* TODO: wrap this value in a Caster Model `dangerIncreaseRoll` method that will augment the % increase */

        const dmTotal = casterState.maxDangerMeter; // 100
        const updatedCasterDangerMeter = casterState.dangerMeter + (dmTotal * actionDangerIncrease);
        changes["casterDangerMeter"] = updatedCasterDangerMeter < dmTotal ? updatedCasterDangerMeter : dmTotal;
    }

    /* Deplete your Danger Meter after super charging */
    if (action.isSuperCharged) {
        changes["casterDangerMeter"] = 0
    }


    /* Bring down Target's Danger Meter */
    if (action.affectTargetDangerMeter != 0) {
        const dmTotal = targetState.maxDangerMeter; // 100
        const updatedTargetDangerMeter = targetState.dangerMeter + (dmTotal * action.affectTargetDangerMeter);
        //Bottom out at 0. You can't bring an enemy's DM up. (Maybe someday an attack can do that as a pro/con)
        changes["targetDangerMeter"] = updatedTargetDangerMeter > 0 ? updatedTargetDangerMeter : 0;
    }

    return {
        ...currentChanges,
        ...changes
    }
}