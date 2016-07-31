/* Commit, Revert, Stash */

export function getRevertChanges(action, casterState, targetState, currentChanges) {

    if (currentChanges.didActionFail) {
        return {...currentChanges}
    }

    let changes = {};

    //Commit: Save things for reloading later
    if (action.changeCasterCommittedData) {

        changes["casterCommitData"] = {
            casterHp: casterState.hp,
            casterStatus: casterState.status,
            targetHp: targetState.hp,
            targetStatus: targetState.status,
            //CLOUD QUEUE ?
        }

    }

    //Stash: Clear a Target's Commit Data
    if (action.clearTargetCommittedData) {
        changes["targetCommitData"] = null;
    }

    //Revert: Applying the saved Data
    if (action.useCasterCommittedData) {

        console.log(currentChanges)

        const saved = casterState.committedTurnData;
        changes["blanketSetCasterHp"] = saved.casterHp;
        changes["blanketSetTargetHp"] = saved.targetHp;
        changes["affectCasterStatus"] = saved.casterStatus;
        changes["affectTargetStatus"] = saved.targetStatus;

        //Get rid of the Commit
        changes["casterCommitData"] = null;
    }



    return {
        ...currentChanges,
        ...changes
    }
}