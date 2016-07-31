const upgradeSchema = {
    name: "insertNameHere",
    description: "insertDescriptionHere"
};

export default {
    /* Pumped Stats per level */
    "character-upgrade-001-i": { /* Implemented! */
        ...upgradeSchema,
        name: "Battery Lord I",
        description: "Gain an extra HP point for every level earned"
    },
    "character-upgrade-001-ii": { /* Implemented! */
        ...upgradeSchema,
        name: "Battery Lord II",
        description: "Gain 2 extra HP points for every level earned"
    },
    "character-upgrade-002": { /* Implemented! */
        ...upgradeSchema,
        name: "Swordsman",
        description: "Gain an extra Attack point for every level earned"
    },

    /* Extra Attacks and Items in Battle */
    //"character-upgrade-003-i": { //TODO
    //    ...upgradeSchema,
    //    name: "1 Extra Attack",
    //    description: "Bring an extra attack to battle"
    //},
    //"character-upgrade-003-ii": { //TODO
    //    ...upgradeSchema,
    //    name: "1 Extra Attack",
    //    description: "Bring an extra attack to battle"
    //},
    //"character-upgrade-004-i": { //TODO
    //    ...upgradeSchema,
    //    name: "1 Extra Item",
    //    description: "Bring an extra item to battle"
    //},
    //"character-upgrade-004-ii": { //TODO
    //    ...upgradeSchema,
    //    name: "1 Extra Item",
    //    description: "Bring an extra item to battle"
    //},

    /* Danger Meter */
    "character-upgrade-005-i": { /* Implemented! */
        ...upgradeSchema,
        name: "Dangerous I",
        description: "Decrease Danger Meter threshold to 65%"
    },
    "character-upgrade-005-ii": { /* Implemented! */
        ...upgradeSchema,
        name: "Dangerous II",
        description: "Decrease Danger Meter threshold to 55%"
    },

    /* Framework dynamics */
    "character-upgrade-006-i": { //TODO
        ...upgradeSchema,
        name: "Weakless I",
        description: "Decrease weakness of your strongest Framework by 15%"
    },
    "character-upgrade-006-ii": { //TODO
        ...upgradeSchema,
        name: "Weakless II",
        description: "Decrease weakness of your strongest Framework by 30%"
    },

    /* Attack Interactions */
    "character-upgrade-007-i": { //TODO
        ...upgradeSchema,
        name: "Oathbreaker",
        description: "15% chance of dissolving oncoming enemy Promises"
    },
    "character-upgrade-007-ii": { //TODO
        ...upgradeSchema,
        name: "Oathbreaker II",
        description: "30% chance of dissolving oncoming enemy Promises"
    },
    "character-upgrade-007-iii": { //TODO
        ...upgradeSchema,
        name: "Oathbreaker III",
        description: "50% chance of dissolving oncoming enemy Promises"
    }

}