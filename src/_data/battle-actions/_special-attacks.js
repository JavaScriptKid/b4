import actionSchema from './battle-action-schema'
import listingTextHelper from '../../helpers/listing-text-helper'
import getArticle from '../../helpers/articles-helper'

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
            "@@pause_400@@",
            `[FAST]${action.name}!`
        ]
    }
};

const getAnimationEntry = function (action, casterModel, targetModel, actionDescription) {
    return {
        type: "animation",
        animationName: action.animation,
        actionDescription: actionDescription
    }
};

export default {
    /* Throttle */
    "attack-special-000-a": {
        ...specialAttackSchema,
        name: "Throttle",
        description: "Causes opponent to lag out for 2 turns",
        ppCost: 4,
        affectTargetStatus: ["normal", "lag"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.status != "normal"
        },
        getFollowupActions: function (action, casterState, targetState, actionDescription) {
            return [
                {
                    action: {
                        targetId: actionDescription.targetId,
                        casterId: actionDescription.targetId,
                        actionId: "natural-recover-lag"
                    },
                    turnRange: [2, 2]
                }
            ]
        },
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
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
        animation: "ddos",
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
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
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
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
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
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
                {
                    type: "message",
                    content: [
                        `${targetState.name} has a memory leak!`
                    ]
                },
                {
                    type: "message",
                    content: [
                        `${targetState.name}'s laptop is getting uncomfortably warm...`
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
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
                {
                    type: "message",
                    content: [
                        `${casterState.name} stole ${listingTextHelper(actionDescription.stolenItemNames)} from ${targetState.name}!`
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
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
                {
                    type: "message",
                    content: [
                        `${casterState.name} stole ${listingTextHelper(actionDescription.stolenItemNames)} from ${targetState.name}!`
                    ]
                }
            ]
        }
    },

    /* Steal and Use Item */
    "attack-special-005-a": {
        ...specialAttackSchema,
        name: "Steal-and-Use",
        description: "Steals 1 random item and immediately uses it",
        theftQuantity: 1,
        ppCost: 11,
        stealAndUseItem: true,
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.items.length == 0
        },
        customSuccessStep(action, casterState, targetState, actionDescription) {
            const itemName = actionDescription.stolenItemNames[0];
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                getAnimationEntry(action, casterState, targetState, actionDescription),
                {
                    type: "message",
                    content: [
                        `[FAST]${casterState.name} stole ${getArticle(itemName)} ${itemName} from ${targetState.name}!`
                    ]
                }
            ]
        }
    },

    /* Clean */
    "attack-special-006-a": {
        ...specialAttackSchema,
        name: "Clean",
        ppCost: 7,
        description: "Clears status back to normal",
        affectCasterStatus: "normal",
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.status == "normal"
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${casterState.name}'s status condition is gone!`
                    ]
                }
            ]
        }
    },

    /* Troll */
    "attack-special-007-a": {
        ...specialAttackSchema,
        name: "Troll",
        animation: "fury",
        ppCost: 5,
        description: "Enters temporary state of fury",
        affectCasterStatus: ["normal", "fury"],
        getFail: function(action, casterState, targetState, actionDescription) {
            return casterState.status != "normal"
        },
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [
                        `${casterState.name} is enraged in fury!`
                    ]
                }
            ]
        },
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        targetId: currentChanges.casterId,
                        casterId: currentChanges.casterId,
                        actionId: "natural-recover-fury"
                    },
                    turnRange: [2, 5]
                }
            ]
        }
    },

    /* Headphones */
    "attack-special-008-a": {
        ...specialAttackSchema,
        name: "Headphones",
        animation: "zen",
        ppCost: 5,
        description: "Enters temporary state of focus",
        affectCasterStatus: ["normal", "zen"],
        getFail: function(action, casterState, targetState, actionDescription) {
            return casterState.status != "normal"
        },
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                {
                    type: "message",
                    content: [
                        `${casterState.name} put on Headphones!`
                    ]
                },
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [
                        `${casterState.name} has entered a state of Focus!`
                    ]
                }
            ]
        },
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        targetId: currentChanges.casterId,
                        casterId: currentChanges.casterId,
                        actionId: "natural-recover-zen"
                    },
                    turnRange: [2, 5]
                }
            ]
        }
    },
    /* Deadline */
    "attack-special-009-a": {
        ...specialAttackSchema,
        name: "Deadline",
        ppCost: 5,
        description: "Boosts speed for 4 to 6 turns",
        affectCasterStatus: ["normal", "deadline"],
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.status != "normal"
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                {
                    type: "message",
                    content: [
                        `${casterState.name} issued a deadline!`
                    ]
                },
                {
                    type: "message",
                    content: [
                        `${casterState.name}'s speed is greatly increased!`
                    ]
                }
            ]
        },
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        targetId: currentChanges.casterId,
                        casterId: currentChanges.casterId,
                        actionId: "natural-recover-deadline"
                    },
                    turnRange: [4, 6]
                }
            ]
        }
    },

    /* Mitigate */
    "attack-special-010-a": {
        ...specialAttackSchema,
        name: "Mitigate",
        ppCost: 5,
        description: "Reduces Enemy Danger Meter by 20%",
        affectTargetDangerMeter: -0.2,
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.dangerMeter == 0
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${targetState.name}'s Danger Meter is reduced!`
                    ]
                }
            ]
        }
    },

    /* ------------------- TIME TRAVEL -------------------------------------------- */
    /* Commit */
    "attack-special-011-a": {
        ...specialAttackSchema,
        name: "Commit",
        animation: "commit",
        ppCost: 1,
        description: "Bookmarks health and statuses of all combatants",
        accuracyModifier: 999, //Don't miss
        speedModifier: 950, /* Should be faster than Items */
        changeCasterCommittedData: true,
        getFail: function(action, casterState, targetState, actionDescription) {
            return false; //TODO
        },
        customSuccessStep(action, casterState, targetState, actionDescription) {
            return [
                getUseMessage(action, casterState, targetState, actionDescription),
                {
                    type: "animation",
                    animationName: action.animation,
                    actionDescription: actionDescription
                },
                {
                    type: "message",
                    content: [
                        `${casterState.name} committed the battle status!`
                    ]
                }
            ]
        }
    },

    /* Revert */
    "attack-special-011-b": {
        ...specialAttackSchema,
        name: "Revert",
        ppCost: 10,
        description: "Reverts battle status to saved Commit",
        accuracyModifier: 999, //Don't miss
        useCasterCommittedData: true,
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.committedTurnData === null
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${casterState.name} reverted the battle to a saved Commit!`
                    ]
                }
            ]
        }
    },

    /* Stash */
    "attack-special-011-c": {
        ...specialAttackSchema,
        name: "Stash",
        ppCost: 7,
        description: "Destroys opponent's Commit",
        accuracyModifier: 999, //Don't miss
        clearTargetCommittedData: true,
        getFail: function(action, casterState, targetState, currentChanges) {
            return targetState.committedTurnData === null
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${casterState.name} cleared ${targetState.name}'s Commit!`
                    ]
                }
            ]
        }
    },


    //**********************************************************************************//
    /* Character Specific Special Attacks */
    "attack-special-charspecific-001": {
        ...specialAttackSchema,
        name: "Retrospective",
        ppCost: 5,
        description: "Recovers 50 HP",
        affectCasterHpPoints: 50,
        accuracyModifier: 999, //Don't miss
        getFail: function(action, casterState, targetState, currentChanges) {
            return casterState.maxHp === casterState.hp; //HP is full
        },
        customSuccessStep(action, casterState, targetState, currentChanges) {
            return [
                getUseMessage(action, casterState, targetState, currentChanges),
                {
                    type: "message",
                    content: [
                        `${casterState.name} recovered lost HP!`
                    ]
                }
            ]
        }
    }




}