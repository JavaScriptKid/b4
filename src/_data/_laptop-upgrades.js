
const upgradeSchema = {
    name: "insertNameHere",
    description: "insertDescriptionHere",
    equipCost: 0,
    sellValue: 0,

    affectCasterAttackPoints: 0,
    affectCasterDefensePoints: 0,
    affectCasterSpeedPoints: 0,
    affectCasterSpecialPoints: 0,
    affectCasterAccuracyPoints: 0,

    /* Alignment */
    alignmentPointsF1: 0,
    alignmentPointsF2: 0,
    alignmentPointsF3: 0,
    alignmentPointsF4: 0,
};

export default {
    "laptop-upgrade_001": {
        ...upgradeSchema,
        name: "Palm Carrier Bag",
        equipCost: 4,
        alignmentPointsF1: 4
    },
    "laptop-upgrade_002": {
        ...upgradeSchema,
        name: "EndGame Earbuds",
        equipCost: 2,
        alignmentPointsF2: 3
    },
    "laptop-upgrade_003": {
        ...upgradeSchema,
        equipCost: 7,
        name: "Vector Drive 4x",
        alignmentPointsF4: 8
    }
}