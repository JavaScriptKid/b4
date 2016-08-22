import actionSchema from './battle-action-schema'
import articleHelper from '../../helpers/articles-helper'


const getItemUseMessage = function(action, casterModel, targetModel, actionDescription) {

    const article = articleHelper(action.name);

    return {
        type: "message",
        content: [
            `${casterModel.name} used ${article} ${action.name}!`
        ]
    }
};

const itemSchema = {
    ...actionSchema,
    type: "Item",
    ppCost: 0,
    animation: "slideOutDown", //animation: "slideDown",
    speedModifier: 900,
    increaseDangerMeter: 0
};

export default {
    "item_001": {
        ...itemSchema,
        name: "Network Reset Code",
        description: "Fixes lagging",
        affectCasterStatus: ["lag", "normal"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.status != "lag"
        },
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name}'s lagging has ended! `]
                }
            ]
        }
    },
    "item_002": {
        ...itemSchema,
        name: "Mini Battery Pack",
        description: "Recovers 10 HP",
        affectCasterHpPoints: 10,
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.hp == casterState.maxHp;
        },
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`[FAST]${casterModel.name} recovered ${actionDescription.affectCasterHp} hp!`]
                }
            ]
        }
    },
    "item_003": {
        ...itemSchema,
        name: "Breakpoint",
        description: "Patches a memory leak",
        affectCasterStatus: ["memory-leak", "normal"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.status != "memory-leak"
        },
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name} fixed the memory leak!`]
                }
            ]
        }
    },
    "item_004": {
        ...itemSchema,
        name: "Mini PP Pack",
        description: "Recovers 15 PP",
        affectCasterPpPoints: 15,
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.pp == casterState.maxPp;
        },
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`[FAST]${casterModel.name} recovered ${actionDescription.affectCasterPp} pp!`]
                }
            ]
        }
    },
    "item_005": {
        ...itemSchema,
        name: "Extinguisher",
        description: "Removes burning flames from a laptop",
        affectCasterStatus: ["fire", "normal"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.status != "fire"
        },
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name} put out the laptop fire!`]
                }
            ]
        }
    },
    "item_006": {
        ...itemSchema,
        name: "Honeypot Mine",
        description: "WARNING! It's a trap! Explodes in your face.",
        affectCasterHpPointsByPercent: -0.33,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`The Honeypot Mine blew up!!!`]
                }
            ]
        }
    }
    //TODO: Attack Sticker, etc
}