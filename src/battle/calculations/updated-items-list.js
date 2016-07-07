import shuffle from 'lodash/shuffle'
import Actions from '../../_data/battle-actions'


var addItemsToArray = function(newItems=[], origArray=[]) {
    return [
        ...origArray,
        ...newItems
    ]
};

var removeItemsFromArray = function(removeItems=[], origArray=[]) {
    var copy = [...origArray];
    removeItems.forEach(removeId => {
        const targetIndex = copy.indexOf(removeId);
        copy = copy.filter((itemId, index) => {
            return index != targetIndex;
        });
    });
    return copy;
};


export function getUpdatedItemsList(action, casterState, targetState, currentChanges) {

    let changes = {};

    /* Use a stealing attack */
    if (action.theftQuantity > 0) {
        const itemsToSteal = [ ...shuffle(targetState.items) ].filter( (itemId, index) => {
            return index < action.theftQuantity;
        });
        const updatedCasterItems = addItemsToArray(itemsToSteal, casterState.items);
        const updatedTargetItems = removeItemsFromArray(itemsToSteal, targetState.items);

        changes["setCasterItemsList"] = updatedCasterItems;
        changes["setTargetItemsList"] = updatedTargetItems;
        changes["stolenItemNames"] = itemsToSteal.map(itemId => {return Actions[itemId].name});
    }


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