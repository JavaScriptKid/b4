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


    //TODO:
    //If this was super charged {
    //
    // changes["casterDangerMeter"] = 0;
    // }

    if (action.isSuperCharged) {
        changes["casterDangerMeter"] = 0
    }


    //TODO:
    /* If this affects the Target's danger meter {
        changes["targetDangerMeter"] = reduction or whatever;
     */


    return {
        ...currentChanges,
        ...changes
    }
}