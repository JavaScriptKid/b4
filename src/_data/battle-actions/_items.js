import actionSchema from './battle-action-schema'

const getItemUseMessage = function(action, casterModel, targetModel, actionDescription) {
    return {
        type: "message",
        content: [
            `${casterModel.name} used a `,
            `[FAST]${action.name}!`
        ]
    }
};

const itemSchema = {
    ...actionSchema,
    type: "Item",
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
                    content: [`${casterModel.name} recovered ${actionDescription.affectCasterHp} hp`]
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
    }
}