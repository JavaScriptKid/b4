import actionSchema from './battle-action-schema'

const attackSchema = {
    ...actionSchema,
    levelRequirement: 0,
    type: "Normal",
    dependentOnAttack: null //"action_attack_whatever_001"
};

export default {
    /* Slice */
    "attack-001-a": {
        ...attackSchema,
        name: "Slice",
        animation: "shootingStar",
        description: "Chops the enemy to bits.",
        affectTargetHpPoints: -5,
        ppCost: 3
    },

    /* Slice mk II */
    "attack-001-b": {
        ...attackSchema,
        name: "Slice mk II",
        description: "Deep cuts than the original Slice",
        affectTargetHpPoints: -9,
        ppCost: 5
    },

    /* Slice mk III */
    "attack-001-c": {
        ...attackSchema,
        name: "Slice mk III",
        description: "Chops the enemy to bits. May lower enemy defense on impact.",
        affectTargetHpPoints: -13,
        ppCost: 6,
        //TODO
        affectTargetDefensePoints: {percentChance: 33.3, affectValue: -2}  /* MIGHT do this. 1/3 chance */
    },


    /* Preloaded */
    "attack-002-a": {
        ...attackSchema,
        name: "Preloaded",
        description: "Extremely fast attack",
        affectTargetHpPoints: -9,
        speedModifier: 6,
        ppCost: 5
    },

    /* Preloaded Mk II */
    "attack-002-b": {
        ...attackSchema,
        name: "Preloaded mk II",
        description: "Even faster version of Preloaded",
        affectTargetHpPoints: -14,
        speedModifier: 8,
        ppCost: 7
    },

    /* Preloaded Mk III */
    "attack-002-c": {
        ...attackSchema,
        name: "Preloaded mk II",
        description: "Fastest loader of them all. Reduces enemy speed.",
        affectTargetHpPoints: -14,
        //TODO
        affectTargetSpeedPoints: {percentChance: 33.3, affectValue: -3}, /* MIGHT do this. 1/3 chance */
        speedModifier: 10,
        ppCost: 9
    },




    /* PROMISE */
    "attack-008-a": {
        ...attackSchema,
        name: "Promise",
        description: "Send an attack in the air to strike later",
        affectTargetHpPoints: -5,
        speedModifier: 0,
        ppCost: 9,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
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
                    animationName: action.animation
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
        affectTargetHpPoints: -25,
        speedModifier: 0,
        ppCost: 0,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                type: "message",
                    content: [`${casterModel.name}'s Promise resolved!`]
                },
                {
                    type: "animation",
                    animationName: action.animation
                }
            ]
        }
    }

}