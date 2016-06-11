import LaptopModels from './laptop-models' /* writing these in a separate file to keep this one manageable */

const defaultPartSchema = {
    name: "insertNameHere",
    description: "insertDescriptionHere",
    sellValue: 0,

    affectTargetAttackPoints: 0,
    affectTargetDefensePoints: 0,
    affectTargetSpeedPoints: 0,
    affectTargetEfficiencyPoints: 0,
    affectTargetAccuracyPoints: 0,

    affectCasterAttackPoints: 0,
    affectCasterDefensePoints: 0,
    affectCasterSpeedPoints: 0,
    affectCasterEfficiencyPoints: 0,
    affectCasterAccuracyPoints: 0
};

export default {

    ...LaptopModels,

    //RAM
    "laptop_ram_002": {
        ...defaultPartSchema,
        name: "4GB Standards",
        affectCasterEfficiencyPoints: 1,
        sellValue: 20 /* These `sellValue`s need to be thought about and "economized" */
    },
    "laptop_ram_003": {
        ...defaultPartSchema,
        name: "8GB Standards",
        description: "8 gigs of the world's most average RAM. Woo them with your mediocre efficiency.",
        affectCasterEfficiencyPoints: 2,
        sellValue: 30
    },
    "laptop_ram_004": {
        ...defaultPartSchema,
        name: "16GB Standards",
        affectCasterEfficiencyPoints: 4,
        sellValue: 40
    },
    "laptop_ram_005": {
        ...defaultPartSchema,
        name: "32GB Standards",
        affectCasterEfficiencyPoints: 6,
        sellValue: 55
    },
    "laptop_ram_006": {
        ...defaultPartSchema,
        name: "64GB Standards",
        affectCasterEfficiencyPoints: 8,
        sellValue: 70
    },
    "laptop_ram_007": {
        ...defaultPartSchema,
        name: "16GB Silvers",
        affectCasterEfficiencyPoints: 4,
        affectCasterSpeedPoints: 1,
        sellValue: 40
    },
    "laptop_ram_008": {
        ...defaultPartSchema,
        name: "32GB Silvers",
        affectCasterEfficiencyPoints: 6,
        affectCasterSpeedPoints: 2,
        sellValue: 70
    },
    "laptop_ram_009": {
        ...defaultPartSchema,
        name: "64GB Silvers",
        affectCasterEfficiencyPoints: 8,
        affectCasterSpeedPoints: 3,
    },
    "laptop_ram_010": {
        ...defaultPartSchema,
        name: "16GB Goldens",
        affectCasterEfficiencyPoints: 4,
        affectCasterSpeedPoints: 4
    },
    "laptop_ram_011": {
        ...defaultPartSchema,
        name: "32GB Goldens",
        affectCasterEfficiencyPoints: 6,
        affectCasterSpeedPoints: 6
    },

    //SCREEN
    "laptop_screen_001": {
        ...defaultPartSchema,
        name: "ClearMind II",
        affectCasterAccuracyPoints: 2
    },
    "laptop_screen_002": {
        ...defaultPartSchema,
        name: "Ocean View 3000",
        affectCasterAccuracyPoints: 3
    },
    "laptop_screen_003": {
        ...defaultPartSchema,
        name: "DonkeyGlass",
        affectCasterAccuracyPoints: 4
    },
    "laptop_screen_004": {
        ...defaultPartSchema,
        name: "Retina",
        affectCasterAccuracyPoints: 6
    },
    "laptop_screen_005": {
        ...defaultPartSchema,
        name: "White Gold Retina",
        affectCasterAccuracyPoints: 6,
        affectCasterSpeedPoints: 1
    },

    //Keyboard
    "laptop_keyboard_001": {
        ...defaultPartSchema,
        name: "Clunk Board 71",
        affectCasterAccuracyPoints: 1,
        affectCasterAttackPoints: 1,
        affectCasterEfficiencyPoints: -1
    },
    "laptop_keyboard_002": {
        ...defaultPartSchema,
        name: "CoDelight",
        affectCasterAccuracyPoints: 2,
        affectCasterAttackPoints: 2
    },
    "laptop_keyboard_003": {
        ...defaultPartSchema,
        name: "CoDelight II",
        affectCasterAccuracyPoints: 3,
        affectCasterAttackPoints: 3
    },

    //DRIVE
    "laptop_drive_001": {
        ...defaultPartSchema,
        name: "Roll Cage",
        affectCasterAttackPoints: 1,
        affectCasterDefensePoints: -1
    },
    "laptop_drive_002": {
        ...defaultPartSchema,
        name: "The Tortoise",
        affectCasterDefensePoints: 4,
        affectCasterAttackPoints: -1,
        affectCasterSpeedPoints: -1
    },
    "laptop_drive_003": {
        ...defaultPartSchema,
        name: "Mother Tortoise",
        affectCasterDefensePoints: 6,
        affectCasterAttackPoints: -1,
        affectCasterSpeedPoints: -2
    }
}