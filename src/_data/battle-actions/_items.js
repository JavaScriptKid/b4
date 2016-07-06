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
    animation: "slideDown"
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
                    animationName: action.animation
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
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                getItemUseMessage(action, casterModel, targetModel, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation
                },
                {
                    type: "message",
                    content: [`${casterModel.name} recovered ${actionDescription.affectCasterHp} hp`]
                }
            ]
        }
    }
}