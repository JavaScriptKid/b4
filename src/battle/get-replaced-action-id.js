import Actions from '../_data/battle-actions'

/**
 * Replace action with an alternate action based on status
 * EX: lagging out
 */

export function getReplacedActionIdMiddleware(originalActionId="", casterModel={}) {

    /* Filter for non-replaceable actions */
    //TODO: Items should not be replaceable. Add in the Item keys to the filter list?
    if ([
        "natural-death-a",
        "natural-recover-lag"
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