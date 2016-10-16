export function getDangerMeter(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.increaseDangerMeter > 0) {

        /* Add action's increase to caster's danger meter */
        const actionDangerIncrease = action.increaseDangerMeter;
        /* TODO: wrap this value in a Caster Model `dangerIncreaseRoll` method that will augment the % increase (for char upgrades) */
        //TODO: Update to the previous TODO ^^. We already reduce the threshold with Dangerous I and II, I don't know that we need a quicker increasing DM.
        //TODO: I mean, aren't those the same thing?

        const dmTotal = casterState.maxDangerMeter; // 100
        const updatedCasterDangerMeter = casterState.dangerMeter + (dmTotal * actionDangerIncrease);
        changes["casterDangerMeter"] = updatedCasterDangerMeter < dmTotal ? updatedCasterDangerMeter : dmTotal;
    }

    /* Deplete your Danger Meter after super charging */
    if (action.superChargedFrameworkId) {
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