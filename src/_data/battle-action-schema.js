export default {
    name: "",
    description: "",

    messageTemplate: [
        "MESSAGE:[FAST]{casterName} used {actionName}!",
        "ANIMATION:tada"
    ],


    //Cost
    ppCost: 0,

    //Combatant Stats
    affectTargetHpPoints: 0,
    affectTargetHpPointsByPercent: 0,
    affectTargetAttackPoints: 0,
    affectTargetDefensePoints: 0,
    affectTargetSpeedPoints: 0,
    affectTargetSpecialPoints: 0,
    affectTargetAccuracyPoints: 0,

    affectCasterHpPoints: 0,
    affectCasterHpPointsByPercent: 0,
    affectCasterAttackPoints: 0,
    affectCasterDefensePoints: 0,
    affectCasterSpeedPoints: 0,
    affectCasterSpecialPoints: 0,
    affectCasterAccuracyPoints: 0,

    //Item stats
    itemValue: 0,
    itemMalfunctionChance: 0,

    //statuses
    protectTargetFromStatuses: [],
    clearTargetStatuses: [],

    protectCasterFromStatuses: [],
    clearCasterStatuses: [],

    affectTargetStatus: "normal",
    statusTurnCount: [], /* [min, max] */

    //Theft
    theftQuantity: 0,
    theftQuality: "random", /* best, worst */
    targetResistanceNeeded: 0, /* target needs defense roll higher than this (?), or it will fail */

    //Turn status
    repetitions: [], /* [1, 4]*/
    speedModifier: 0,
    accuracyModifier: 0,
}