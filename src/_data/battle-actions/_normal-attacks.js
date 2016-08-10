import actionSchema from './battle-action-schema'

const attackSchema = {
    ...actionSchema,
    levelRequirement: 0,
    type: "Normal",
    dependentOnAttack: null //"action_attack_whatever_001"
};

const getIteratingSuccessMessage = function(action, casterModel, targetModel, actionDescription, nextState) {
    return [
        {
            type: "message",
            content: [
                `${casterModel.name} used `,
                "@@pause_300@@",
                `[FAST]${action.name}!`
            ]
        },
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
            content: [`It hit ${actionDescription.repetitionsCount} times!`]
        }
    ]
};

export default {
    /* Insult */
    "attack-000-a": {
        ...attackSchema,
        name: "Insult",
        animation: "tada",
        description: "When you have nothing left to lose",
        affectTargetHpPoints: -2,
        bypassCasterAttackStats: true,
        ppCost: 0,
        increaseDangerMeter: 0
    },


    /* Slice */
    "attack-001-a": {
        ...attackSchema,
        name: "Slice",
        animation: "tada", //"shootingStar",
        description: "Chops the enemy to bits.",
        affectTargetHpPoints: -4,
        ppCost: 3
    },

    /* Slice mk II */
    "attack-001-b": {
        ...attackSchema,
        name: "Slice mk II",
        description: "Deep cuts than the original Slice",
        affectTargetHpPoints: -6,
        ppCost: 5
    },

    /* Slice mk III */
    "attack-001-c": {
        ...attackSchema,
        name: "Slice mk III",
        description: "Chops the enemy to bits. May lower enemy defense on impact.",
        affectTargetHpPoints: -8,
        ppCost: 6,
        //TODO
        affectTargetDefensePoints: {percentChance: 33.3, affectValue: -2}  /* MIGHT do this. 1/3 chance */
    },


    /* Preloaded */
    "attack-002-a": {
        ...attackSchema,
        name: "Preloaded",
        description: "Extremely fast attack",
        affectTargetHpPoints: -5,
        speedModifier: 6,
        ppCost: 5
    },

    /* Preloaded Mk II */
    "attack-002-b": {
        ...attackSchema,
        name: "Preloaded mk II",
        description: "Even faster version of Preloaded",
        affectTargetHpPoints: -6,
        speedModifier: 8,
        ppCost: 7
    },

    /* Preloaded Mk III */
    "attack-002-c": {
        ...attackSchema,
        name: "Preloaded mk II",
        description: "Fastest loader of them all. Reduces enemy speed.",
        affectTargetHpPoints: -7,
        //TODO
        affectTargetSpeedPoints: {percentChance: 33.3, affectValue: -3}, /* MIGHT do this. 1/3 chance */
        speedModifier: 10,
        ppCost: 9
    },

    /* forEach */
    "attack-003-a": {
        ...attackSchema,
        name: "ForEach",
        animation: "tada", //"iterate",
        description: "Hits the enemy 2 to 4 times with wildcard damage",
        affectTargetHpPoints: [1,2,3], //one of these
        repetitions: [2,4],
        repetitionType: "random",
        ppCost: 5,
        increaseDangerMeter: 0.17,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },
    /* forEach Mk II */
    "attack-003-b": {
        ...attackSchema,
        name: "ForEach Mk II",
        animation: "tada", //"iterate",
        description: "Hits the enemy 3 to 5 times with stronger wildcard damage",
        affectTargetHpPoints: [1,2,3], //one of these,
        repetitions: [3,5],
        repetitionType: "random",
        ppCost: 8,
        increaseDangerMeter: 0.17,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },
    /* forEach Mk III */
    "attack-003-c": {
        ...attackSchema,
        name: "ForEach Mk III",
        animation: "tada", //"iterate",
        description: "Hits the enemy 4 to 6 times with stronger wildcard damage",
        affectTargetHpPoints: [1,2,3,4], //one of these,,
        repetitions: [4,6],
        repetitionType: "random",
        ppCost: 11,
        increaseDangerMeter: 0.17,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },

    /* map */
    "attack-004-a": {
        ...attackSchema,
        name: "Map",
        animation: "tada", // "iterate",
        description: "Hits the enemy 2 to 4 times with consistent damage",
        affectTargetHpPoints: [1,2,3], //one of these,
        repetitions: [2,4],
        repetitionType: "map",
        ppCost: 5,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },
    "attack-004-b": {
        ...attackSchema,
        name: "Map Mk II",
        animation: "tada", // "iterate",
        description: "Hits the enemy 3 to 5 times with consistent damage",
        affectTargetHpPoints: [1,2,3], //one of these,
        repetitions: [3,5],
        repetitionType: "map",
        ppCost: 7,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },
    "attack-004-c": {
        ...attackSchema,
        name: "Map Mk III",
        animation: "tada", // "iterate",
        description: "Hits the enemy 4 to 6 times with consistent damage",
        affectTargetHpPoints: [1,2,3,4], //one of these,
        repetitions: [4,6],
        repetitionType: "map",
        ppCost: 9,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },

    /* Reduce */
    "attack-005-a": {
        ...attackSchema,
        name: "Reduce",
        animation: "tada", //: "iterate",
        description: "Hits the enemy 2 to 4 times with increasing damage",
        affectTargetHpPoints: [1,2,3], //one of these,
        repetitions: [2,4],
        repetitionType: "reduce",
        ppCost: 5,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },
    "attack-005-b": {
        ...attackSchema,
        name: "Reduce Mk II",
        animation: "tada", //: "iterate",
        description: "Hits the enemy 3 to 5 times with increasing damage",
        affectTargetHpPoints: [1,2,3], //one of these,
        repetitions: [3,5],
        repetitionType: "reduce",
        ppCost: 7,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },
    "attack-005-c": {
        ...attackSchema,
        name: "Reduce Mk III",
        animation: "tada", //: "iterate",
        description: "Hits the enemy 3 to 6 times with increasing damage",
        affectTargetHpPoints: [1,2,3,4], //one of these,
        repetitions: [3,6],
        repetitionType: "reduce",
        ppCost: 9,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return getIteratingSuccessMessage(action, casterModel, targetModel, actionDescription, nextState)
        }
    },




    /* PROMISE */
    "attack-008-a": {
        ...attackSchema,
        name: "Promise",
        description: "Send an attack in the air to strike later",
        affectTargetHpPoints: -1,
        speedModifier: 0,
        ppCost: 9,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return [
                { //copy of "use" message
                    type: "message",
                    content: [
                        `${casterModel.name} used `,
                        "@@pause_300@@",
                        `[FAST]${action.name}!`
                    ]
                },
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
                    content: [`A promise flew into the air!`]
                }
            ]
        },
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        casterId: currentChanges.casterId,
                        targetId: currentChanges.targetId,
                        actionId: "attack-008-a-resolve"
                    },
                    turnRange: [2, 5]
                }
            ]
        }
    },
    "attack-008-a-resolve": {
        ...attackSchema,
        name: "(Promise: resolve)",
        description: "",
        affectTargetHpPoints: -9,
        speedModifier: 0,
        ppCost: 0,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {
            return [
                {
                type: "message",
                    content: [`${casterModel.name}'s Promise resolved!`]
                },
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                }
            ]
        }
    },


    /* Scope Bomb */
    "attack-009-a": {
        ...attackSchema,
        name: "Scope Bomb",
        animation: "tada",
        description: "Extra effective against a deadline",
        affectTargetHpPoints: -5,
        statusMultiplier: ["deadline", 2],
        ppCost: 5,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription, nextState) {

            let queue = [
                {
                    type: "message",
                    content: [`${casterModel.name} dropped a Scope Bomb!`]
                },
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                }
            ];

            //Add an extra message if it was Super Effective
            if (actionDescription.wasSuperEffective) {
                queue.push({
                        type: "message",
                        content: [`It was extra painful!`]
                    })
            }

            return [...queue]
        }
    }

}