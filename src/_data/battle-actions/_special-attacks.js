import actionSchema from './battle-action-schema'

const specialAttackSchema = {
    ...actionSchema,
    levelRequirement: 0,
    type: "Special",
    dependentOnAttack: null //"action_attack_whatever_001"
};

const getUseMessage = function(action, casterModel, targetModel, actionDescription) {
    return {
        type: "message",
        content: [
            `${casterModel.name} used `,
            `[FAST]${action.name}!`
        ]
    }
};


export default {
    /* DDoS */
    "attack-special-001-a": {
        ...specialAttackSchema,
        name: "DDoS",
        description: "Causes opponent to lag out",
        ppCost: 6,
        affectTargetStatus: ["normal", "lag"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.status != "normal"
        },
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        targetId: currentChanges.targetId,
                        casterId: currentChanges.targetId,
                        actionId: "natural-recover-lag"
                    },
                    turnRange: [2, 5]
                }
            ]
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${targetState.name} is lagging out!`
                    ]
                }
            ]
        }
    },

    /* Garbage Jammer */
    "attack-special-002-a": {
        ...specialAttackSchema,
        name: "Garbage Jammer",
        description: "Causes a memory leak",
        ppCost: 6,
        affectTargetStatus: ["normal", "memory-leak"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.status != "normal"
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${targetState.name} has a memory leak!`
                    ]
                }
            ]
        }
    }
}