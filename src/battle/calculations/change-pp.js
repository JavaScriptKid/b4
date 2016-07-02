export function getPpChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.ppCost) {
        //Some sort of defense roll?
        changes["affectCasterPp"] = action.ppCost * -1; //wording is a little different, but easier to digest
    }

    return {
        ...currentChanges,
        ...changes
    }
}