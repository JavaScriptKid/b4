export default {
    name: "Combatant Name",
    level: 3,
    xp: 0,
    class: "ninja",
    skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
    laptopUpgrades: [
        // { libraryId: "laptop-upgrade_001", isEnabled: true },
        // { libraryId: "laptop-upgrade_002", isEnabled: true },
        // { libraryId: "laptop-upgrade_003", isEnabled: true } /* can be disabled by special attacks? */
    ],
    characterUpgrades: [
        // { libraryId: "character-upgrade-001-i" }
    ],

    ///////////////////////////////////

    hp: 50,
    maxHp: 50,
    pp: 50,
    maxPp: 50,
    status: "normal", /* normal, memory-leak, lag, fire */
    healthStatPoints: 0,
    attackStatPoints: 0,
    defenseStatPoints: 0,
    speedStatPoints: 0,
    efficiencyStatPoints: 0,
    healthModifier: 0,
    attackModifier: 0,
    defenseModifier: 0,
    speedModifier: 0,
    efficiencyModifier: 0,
    accuracyModifier: 0
    
};