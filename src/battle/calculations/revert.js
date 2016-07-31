/* Commit, Revert, Stash */

export function getRevertChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.changeCasterCommittedTurnIndex) {
        changes["casterCommittedTurnIndex"] = currentChanges.currentTurnIndex;
    }

    if (action.clearTargetCommittedTurnIndex) {
        changes["targetCommittedTurnIndex"] = -1;
    }

    return {
        ...currentChanges,
        ...changes
    }
}