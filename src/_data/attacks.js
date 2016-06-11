import actionSchema from './battle-action-schema'


const attackSchema = {
    ...actionSchema,
    levelRequirement: 0,
    type: "Normal",
    dependentOnAttack: null //"action_attack_whatever_001"
};

export default {
    /* Basic attacks */
    action_attack_basic_000: { /* Shows when PP is 0 or less than whatever your lowest requirement is */
        ...attackSchema,
        name: "Insult",
        description: "When you've got nothing else to show for yourself",
        affectTargetHpPoints:1,
        ppCost: 0,

        levelRequirement: 1
    },

    action_attack_basic_001: {
        ...attackSchema,
        name: "Slice",
        animation: "shootingStar",
        description: "Quick zinger",
        affectTargetHpPoints:5,
        ppCost: 3,

        levelRequirement: 1
    },
    action_attack_basic_002: {
        ...attackSchema,
        name: "Preloaded",
        description: "Extremely fast attack",
        affectTargetHpPoints:9,
        speedModifier:6,
        ppCost: 5,

        levelRequirement: 3
    },

    action_attack_repetitions_001: {
        ...attackSchema,
        name: "forEach",
        animation: "forEach1",
        description: "Hits the opponent 2 to 4 times",
        repetitions: [2, 4],
        affectTargetHpPoints: 3,
        ppCost: 4,

        levelRequirement: 2
    },
    action_attack_repetitions_002: {
        ...attackSchema,
        name: "forEach Mk II",
        animation: "forEach1",
        description: "Hits the opponent a little harder, 3 to 7 times",
        repetitions: [3, 7],
        affectTargetHpPoints: 5,
        ppCost: 7,

        levelRequirement: 7
    },


    action_attack_theft_001: {
        ...attackSchema,
        name: "Curl",
        animation: "forEach1",
        description: "Steals one random item from target",
        theftQuality: "random",
        theftQuantity: 1,
        targetResistanceNeeded: 8,
        ppCost: 8,

        levelRequirement: 1
    },
    action_attack_theft_002: {
        ...attackSchema,
        name: "Curl Mk II",
        description: "Steals two random items from target",
        theftQuality: "random",
        theftQuantity: 2,
        targetResistanceNeeded: 8,
        ppCost: 10,

        levelRequirement: 6
    },
    action_attack_theft_003: {
        ...attackSchema,
        name: "Curl Mk III",
        description: "Steals two strongest items from target",
        theftQuality: "best",
        theftQuantity: 2,
        targetResistanceNeeded: 10,
        ppCost: 12,

        levelRequirement: 10
    },

    action_attack_status_001: {
        ...attackSchema,
        name: "DDoS",
        description: "Disables the target for 1 to 3 turns",
        statusTurnCount: [1,3],
        affectTargetStatus: "lag",
        targetResistanceNeeded: 15,
        accuracyModifier: -3,
        ppCost: 7,

        levelRequirement: 4
    },
    
    action_attack_status_002: {
        ...attackSchema,
        name: "Garbage Jammer",
        description: "Causes the target to suffer a memory leak",
        affectTargetStatus: "memoryLeak",
        targetResistanceNeeded: 15,
        accuracyModifier: -3,
        ppCost: 7,

        levelRequirement: 3
    }
    //action_attack_status_megaattack_001: {
    //    ...attackSchema,
    //    name: "Mega Jammer",
    //    description: "Righteous blow + causes the target to suffer a memory leak",
    //    affectTargetStatus: "memoryLeak",
    //    targetResistanceNeeded: 15,
    //    affectTargetHpPoints: 15
    //
    //}

}