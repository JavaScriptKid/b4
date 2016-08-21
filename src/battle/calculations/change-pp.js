export function getPpChanges(action, casterModel, targetModel, currentChanges) {

    let changes = {};

    if (action.ppCost) {
        //Some sort of defense roll?
        changes["affectCasterPp"] = action.ppCost * -1; //wording is a little different, but easier to digest
    }

    //Recover PP with an Item
    if (action.affectCasterPpPoints > 0) {
        const maxPp = casterModel.maxPp;
        const pp = casterModel.pp;
        const gain = ( pp + action.affectCasterPpPoints > maxPp )
            ? (maxPp - pp)
            : action.affectCasterPpPoints;

        changes["affectCasterPp"] = gain

    }


    return {
        ...currentChanges,
        ...changes
    }
}