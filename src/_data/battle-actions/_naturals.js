import actionSchema from './battle-action-schema'

export default {
    /* Death */
    "natural-death-a": {
        ...actionSchema,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "message",
                    content: [`${casterModel.name} has run out of battery life`]
                }
            ]
        }
    },
    "natural-memory-leak-a": {
        ...actionSchema,
        animation: "sick-shake",
        affectTargetHpPointsByPercent: -0.07,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation
                },
                {
                    type: "message",
                    content: [`${casterModel.name} is hurt by the memory leak`]
                }
            ]
        }
    },
    "natural-fire-a": {
        ...actionSchema,
        animation: "sick-shake",
        affectTargetHpPointsByPercent: -0.20,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation
                },
                {
                    type: "message",
                    content: [`[FAST]${casterModel.name}'s laptop is burning in fire`]
                }
            ]
        }
    }
}