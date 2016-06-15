const upgradeSchema = {
    name: "insertNameHere",
    description: "insertDescriptionHere"
};

export default {
    /* Pumped Stats per level */
    "character-upgrade-001-i": {
        ...upgradeSchema,
        name: "Battery Lord I",
        description: "Gain an extra HP point for every level earned"
    },
    "character-upgrade-001-ii": {
        ...upgradeSchema,
        name: "Battery Lord II",
        description: "Gain 2 extra HP points for every level earned"
    },
    "character-upgrade-002": {
        ...upgradeSchema,
        name: "Swordsman",
        description: "Gain an extra Attack point for every level earned"
    },

    /* Extra Attacks and Items in Battle */
    "character-upgrade-003-i": {
        ...upgradeSchema,
        name: "1 Extra Attack",
        description: "Bring an extra attack to battle"
    },
    "character-upgrade-003-ii": {
        ...upgradeSchema,
        name: "1 Extra Attack",
        description: "Bring an extra attack to battle"
    },
    "character-upgrade-004-i": {
        ...upgradeSchema,
        name: "1 Extra Item",
        description: "Bring an extra item to battle"
    },
    "character-upgrade-004-ii": {
        ...upgradeSchema,
        name: "1 Extra Item",
        description: "Bring an item to battle"
    },

    /* Danger Meter */
    "character-upgrade-005-i": {
        ...upgradeSchema,
        name: "Dangerous I",
        description: "Decrease Danger Meter threshold to 85"
    },
    "character-upgrade-005-ii": {
        ...upgradeSchema,
        name: "Dangerous II",
        description: "Decrease Danger Meter threshold to 70"
    },

    /* Framework dynamics */
    "character-upgrade-006-i": {
        ...upgradeSchema,
        name: "Weakless I",
        description: "Decrease weakness of your strongest Framework by 15%"
    },
    "character-upgrade-006-ii": {
        ...upgradeSchema,
        name: "Weakless II",
        description: "Decrease weakness of your strongest Framework by 30%"
    }

}