export default {
    name: "",
    description: "",
    animation: "tada",

    //Cost
    ppCost: 0,

    //Danger Meter
    increaseDangerMeter: 0.15,
    affectTargetDangerMeter: 0,

    //Combatant Stats
    affectTargetHpPoints: 0,
    affectTargetHpPointsByPercent: 0,
    affectTargetAttackPoints: 0,
    affectTargetDefensePoints: 0,
    affectTargetSpeedPoints: 0,
    affectTargetSpecialPoints: 0,
    affectTargetAccuracyPoints: 0,

    bypassCasterAttackStats: false, //Don't let move use the Attack stat, like "Insult"

    affectCasterHpPoints: 0,
    affectCasterHpPointsByPercent: 0,
    affectCasterAttackPoints: 0,
    affectCasterDefensePoints: 0,
    affectCasterSpeedPoints: 0,
    affectCasterSpecialPoints: 0,
    affectCasterAccuracyPoints: 0,

    //Status multiplier
    statusMultiplier: null, //[status, rate] EX: ["deadline", 1.5]

    //Item stats
    itemValue: 0,
    itemMalfunctionChance: 0,

    //statuses
    affectTargetStatus: null, //"normal", "memory-leak", "lag", "fury", "zen", "fire
    affectCasterStatus: null, //"normal", "memory-leak", "lag", "fury", "zen", "fire
    statusTurnCount: [], /* [min, max] */
    dependentOnCasterStatus: null,
    dependentOnTargetStatus: null,

    //Theft
    theftQuantity: 0,
    theftQuality: "random", /* best, worst */
    targetResistanceNeeded: 0, /* target needs defense roll higher than this (?), or it will fail */
    stealAndUseItem: false,

    //Turn status
    repetitions: [], /* [1, 4]*/
    speedModifier: 0,
    accuracyModifier: 0,

    customSuccessStep: null, //function,
    customMissStep: null, //function,
    customFailStep: null, //function,

    //Time Travel
    changeCasterCommittedData: false,
    clearTargetCommittedData: false,
    useCasterCommittedData: false,


    getFail: function() {
        return false
    },

    getFollowupActions: function() {
        return [
        /*{
            action: {},
            turnRange: [2,5]
        * }*/
        ]
    }


}