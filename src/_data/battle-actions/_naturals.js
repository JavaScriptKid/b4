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
        dependentOnCasterStatus: "memory-leak",
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
        dependentOnCasterStatus: "fire",
        affectTargetHpPointsByPercent: -0.15,
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
    },
    "natural-lag-a": {
        ...actionSchema,
        ppCost: 0,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "message",
                    content: [`${casterModel.name} is lagging too much to attack`]
                }
            ]
        }
    },
    "natural-recover-lag": {
        ...actionSchema,
        ppCost: 0,
        animation: "tada",
        dependentOnCasterStatus: "lag",
        affectCasterStatus: ["lag", "normal"], /* If lag, change to normal" */
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation
                },
                {
                    type: "message",
                    content: [`${casterModel.name}'s lagging has ended!`]
                }
            ]
        }
    }
}