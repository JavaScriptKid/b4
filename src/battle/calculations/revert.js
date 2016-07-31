/* Commit, Revert, Stash */

export function getRevertChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.changeCasterCommittedTurnIndex) {
        changes["casterCommittedTurnIndex"] = currentChanges.currentTurnIndex
    }

    return {
        ...currentChanges,
        ...changes
    }
}