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
    "attack-special-000-a": {
        ...specialAttackSchema,
        name: "Throttle",
        description: "Causes opponent to lag out for 1 or 2 turns",
        ppCost: 4,
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
                    turnRange: [1, 2]
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
    /* DDoS */
    "attack-special-001-a": {
        ...specialAttackSchema,
        name: "DDoS",
        description: "Causes lagging for 2 to 5 turns",
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
    },

    /* Thrash */
    "attack-special-003-a": {
        ...specialAttackSchema,
        name: "Thrash",
        description: "Causes a memory leak and gradual burning",
        ppCost: 10,
        affectTargetStatus: ["normal", "memory-leak"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.status != "normal"
        },
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        targetId: currentChanges.targetId,
                        casterId: currentChanges.targetId,
                        actionId: "attack-special-003-a-catchfire"
                    },
                    turnRange: [2, 2]
                }
            ]
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${targetState.name} has a memory leak!`
                    ]
                },
                {
                    type: "message",
                    content: [
                        `${targetState.name}'s laptop is getting uncomfortably warm`
                    ]
                }
            ]
        }
    },
    "attack-special-003-a-catchfire": {
        ...specialAttackSchema,
        name: "(Thrash: catch fire)",
        description: "",
        ppCost: 0,
        dependentOnCasterStatus: "memory-leak",
        affectTargetStatus: ["memory-leak", "fire"],
        // getFail: function(action, casterState, targetState, currentChanges) {
        //     return targetState.status != "memory-leak"
        // },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                {
                    type: "message",
                    content: [
                        `[FAST]${targetState.name}'s laptop `,
                        `[FAST]CAUGHT ON FIRE`
                    ]
                }
            ]
        }
    },

    /* Curl */
    "attack-special-004-a": {
        ...specialAttackSchema,
        name: "Curl",
        description: "Steals 1 random item",
        ppCost: 6,
        theftQuantity: 1,
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.items.length == 0
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${casterState.name} stole 1 item`
                    ]
                }
            ]
        }
    },
    "attack-special-004-b": {
        ...specialAttackSchema,
        name: "Curl mk II",
        description: "Steal 2 random items",
        ppCost: 6,
        theftQuantity: 2,
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.items.length == 0
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${casterState.name} stole 2? items`
                    ]
                }
            ]
        }
    }
}