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
        ...actionSchema,
        name: "Slice",
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
        ...actionSchema,
        name: "Slice mk II",
        description: "Deep cuts than the original Slice",
        affectTargetHpPoints: -9,
        ppCost: 5
    },

    /* Slice mk III */
    "attack-001-c": {
        ...actionSchema,
        name: "Slice mk III",
        description: "Chops the enemy to bits, lowers enemy defense on impact.",
        affectTargetHpPoints: -13,
        ppCost: 6,
        affectTargetDefensePoints: -2
    },


    /* Preloaded */
    "attack-002-a": {
        ...actionSchema,
        name: "Preloaded",
        description: "Extremely fast attack",
        affectTargetHpPoints: -9,
        speedModifier: 6,
        ppCost: 5
    },

    /* Preloaded Mk II */
    "attack-002-b": {
        ...actionSchema,
        name: "Preloaded mk II",
        description: "Even faster version of Preloaded",
        affectTargetHpPoints: -14,
        speedModifier: 8,
        ppCost: 7
    },

    /* Preloaded Mk III */
    "attack-002-c": {
        ...actionSchema,
        name: "Preloaded mk II",
        description: "Fastest loader of them all. Reduces enemy speed.",
        affectTargetHpPoints: -14,
        affectTargetSpeedPoints: -3,
        speedModifier: 10,
        ppCost: 9
    }
}