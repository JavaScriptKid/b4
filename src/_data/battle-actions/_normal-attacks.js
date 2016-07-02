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
        ppCost: 3,
        //getRolloutOutput: function(properties={}) {
        //    return [
        //        `MESSAGE:${properties.playerName} used Slice!`,
        //        `ANIMATION:${properties.animationName}`
        //    ]
        //}
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
        affectTargetSpeedPoints: {percentChance: 33.3, affectValue: -3}, /* MIGHT do this. 1/3 chance */
        speedModifier: 10,
        ppCost: 9
    }
}