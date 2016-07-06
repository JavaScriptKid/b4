export function getUpdatedItemsList(action, casterState, targetState, currentChanges) {

    let changes = {};

    /* Use up an item id from caster's Item list */
    if (action.type == "Item") {
        
        //Need to remove action.actionId
        const targetIndex = casterState.items.indexOf(action.actionId); //First match
        const updatedItems = casterState.items.filter((itemId, index) => {
            return index != targetIndex;
        });

        /* Add this property of # of items is different */
        if (updatedItems.length != casterState.items.length) {
            changes["setCasterItemsList"] = updatedItems;
        }
    }

    return {
        ...currentChanges,
        ...changes
    }
}