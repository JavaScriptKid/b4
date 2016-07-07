import Actions from '../_data/battle-actions'

/**
 * Replace action with an alternate action based on status
 * EX: lagging out
 */

export function getReplacedActionIdMiddleware(originalActionId="", casterModel={}) {

    /* Filter for non-replaceable actions */
    if ([
        "natural-death-a",
        "attack-008-a-resolve", //promise resolve
        "attack-special-006-a", //"clean" status back to normal
        "natural-recover-lag",
    ].indexOf(originalActionId) > -1) {
        return originalActionId;
    }

    //Replace logic
    const actionModel = Actions[originalActionId];
    if (casterModel.status == "lag" && actionModel.type != "Item") {
        return "natural-lag-a";
    }

    //Default to original
    return originalActionId;
}