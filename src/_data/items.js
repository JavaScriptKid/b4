//import actionSchema from './battle-actions/battle-action-schema'
//
//const itemSchema = {
//    sellValue: 0,
//    itemValue: 0,
//    canUseOutsideOfBattle: false,
//    canSell: true
//};
//
//export default {
//    /* HEALTH */
//    action_item_hp_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Mini Battery Pack",
//        description: "Recovers a portable bit of battery life",
//        affectCasterHpPoints: 10,
//        canUseOutsideOfBattle: true,
//        itemValue: 4,
//        sellValue: 5,
//    },
//
//
//    /* PP */
//    action_item_pp_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Mini Power Pack",
//        description: "Recovers a portable bit of accessible memory",
//        affectCasterPpPoints: 15,
//        itemValue: 4,
//        canUseOutsideOfBattle: true
//    },
//
//    /* ACCURACY */
//    action_item_accuracy_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Screen Wipe",
//        description: "Increases accuracy by 5 percent for the whole battle",
//        affectCasterAccuracyPoints: 5,
//        itemValue: 4
//    },
//    action_item_accuracy_002: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Screen Spray",
//        description: "Increases accuracy by 10 percent for the whole battle",
//        affectCasterAccuracyPoints: 10,
//        itemValue: 7,
//    },
//    action_item_accuracy_003: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Retina",
//        description: "Increases accuracy by 25 percent for the whole battle",
//        affectCasterAccuracyPoints: 25,
//        itemValue: 9,
//    },
//
//    /* STATUS */
//    action_item_clearStatus_lag_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Network Reset Code",
//        description: "Heals lagging",
//        itemValue: 10,
//        clearCasterStatuses: ["lag"],
//        itemMalfunctionChance: 5
//    },
//    action_item_clearStatus_memoryLeak_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Breakpoint",
//        description: "Stops a memory leak",
//        itemValue: 10,
//        clearCasterStatuses: ["memoryLeak"]
//    },
//
//    action_item_protectStatus_all_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Honeypot",
//        description: "Prevents status-changing attack for 1 use",
//        itemValue: 14,
//        itemMalfunctionChance: 7,
//        protectCasterFromStatuses: ["memoryLeak", "lag"]
//    },
//
//    action_item_sticker_attack_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Attack Sticker I",
//        description: "Increases base attack stat by 3 points for the battle",
//        itemValue: 8,
//        sellValue: 7,
//        affectCasterAttackPoints: 3
//    },
//    action_item_sticker_defense_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Defense Sticker I",
//        description: "Increases base defense stat by 3 points for the battle",
//        itemValue: 8,
//        sellValue: 7,
//        affectCasterDefensePoints: 3
//    },
//    action_item_sticker_speed_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Speed Sticker I",
//        description: "Increases base speed stat by 3 points for the battle",
//        itemValue: 8,
//        sellValue: 7,
//        affectCasterSpeedPoints: 3
//    },
//    action_item_sticker_efficiency_001: {
//        ...actionSchema,
//        ...itemSchema,
//        animation: "slideOutDown",
//        accuracyModifier: 999,
//        name: "Efficiency Sticker I",
//        description: "Increases base efficiency stat by 3 points for the battle",
//        itemValue: 8,
//        sellValue: 7,
//        affectCasterEfficiencyPoints: 3
//    }
//
//}