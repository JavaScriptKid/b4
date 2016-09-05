import actionSchema from './battle-action-schema'

const naturalSchema = {
    ...actionSchema,
    accuracyModifier: 999 //No way these can miss
};

export default {
    /* Death */
    "natural-death-a": {
        ...naturalSchema,
        animation: "die",
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name} has run out of battery life!`]
                }
            ]
        }
    },
    "natural-memory-leak-a": {
        ...naturalSchema,
        animation: "ouch",
        dependentOnCasterStatus: "memory-leak",
        affectTargetHpPointsByPercent: -0.15,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "stateChange", newState: nextState
                },
                {
                    type: "message",
                    content: [`${casterModel.name} is hurt by the memory leak!`]
                }
            ]
        }
    },
    "natural-fire-a": {
        ...naturalSchema,
        animation: "tada", //"sick-shake",
        dependentOnCasterStatus: "fire",
        affectTargetHpPointsByPercent: -0.25,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`[FAST]${casterModel.name}'s laptop is burning in fire!!!`]
                }
            ]
        }
    },
    "natural-lag-a": {
        ...naturalSchema,
        ppCost: 0,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "message",
                    content: [`${casterModel.name} is lagging too much to attack!`]
                }
            ]
        }
    },

    "natural-recover-lag": {
        ...naturalSchema,
        ppCost: 0,
        animation: "tada",
        dependentOnCasterStatus: "lag",
        affectCasterStatus: ["lag", "normal"], /* If lag, change to normal" */
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name}'s lagging has ended!`]
                }
            ]
        }
    },

    "natural-recover-fury": {
        ...naturalSchema,
        ppCost: 0,
        animation: "tada",
        dependentOnCasterStatus: "fury",
        affectCasterStatus: ["fury", "normal"], /* If fury, change to normal" */
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name} has calmed down from fury.`]
                }
            ]
        }
    },

    "natural-recover-zen": {
        ...naturalSchema,
        ppCost: 0,
        animation: "tada",
        dependentOnCasterStatus: "zen",
        affectCasterStatus: ["zen", "normal"], /* If zen, change to normal" */
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name}'s focus has broken!`]
                }
            ]
        }
    },

    "natural-recover-deadline": {
        ...naturalSchema,
        ppCost: 0,
        animation: "tada",
        dependentOnCasterStatus: "deadline",
        affectCasterStatus: ["deadline", "normal"], /* If deadline, change to normal" */
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [`${casterModel.name}'s deadline has passed.`]
                }
            ]
        }
    }

}