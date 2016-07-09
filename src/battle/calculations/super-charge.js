import Frameworks from '../../_data/_frameworks'

export function getSuperCharged(action, casterState, targetState, currentChanges) {

    let changes = {};
    const frameworkId = action.superChargedFrameworkId;

    changes["isSuperCharged"] = Boolean(frameworkId); /* This property should always exist. true or false. It comes from the submission? */

    if (frameworkId) {
        changes["frameworkName"] = Frameworks[frameworkId].name;
    }


    return {
        ...currentChanges,
        ...changes
    }
}