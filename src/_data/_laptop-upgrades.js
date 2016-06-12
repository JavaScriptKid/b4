
const upgradeSchema = {
    name: "insertNameHere",
    description: "insertDescriptionHere",
    equipCost: 0,
    sellValue: 0,

    affectCasterAttackPoints: 0,
    affectCasterDefensePoints: 0,
    affectCasterSpeedPoints: 0,
    affectCasterSpecialPoints: 0,
    affectCasterAccuracyPoints: 0
};

export default {
    "laptop-upgrade_001": {
        ...upgradeSchema,
        name: "Elm Carrier Bag",
        equipCost: 4
    },
    "laptop-upgrade_002": {
        ...upgradeSchema,
        name: "React Earbuds",
        equipCost: 2
    },
    "laptop-upgrade_003": {
        ...upgradeSchema,
        equipCost: 7,
        name: "Angular Drive 4x"
    }
}