import {getClassStatsByLevel} from './get-stats/get-class-stats-by-level'

/* Wrapper for retrieving character stats */
/* Includes Character Upgrades */
export function getCombatantStats(combatant={}) {
    const stats = getClassStatsByLevel(combatant.class, combatant.level);

    return {
        maxHp: applyHealthUpgrades(stats.maxHp, combatant),
        maxPp: stats.maxPp,
        attackStatPoints: applyAttackUpgrades(stats.atk, combatant),
        defenseStatPoints: stats.def,
        specialStatPoints: stats.spec,
        speedStatPoints: stats.spd
    }

}


export function hasUpgrade(libraryId="", dataset=[]) {
    const upgradeMatch = dataset.find(upgrade => {
        return upgrade.libraryId == libraryId
    });
    return Boolean(upgradeMatch);
};

/* Health Character Upgrade */
var applyHealthUpgrades = function(initialValue=0, combatant={}) {
    var value = initialValue;
    const firstHealthUpgrade = hasUpgrade("character-upgrade-001-i", combatant.characterUpgrades);
    const secondHealthUpgrade = hasUpgrade("character-upgrade-001-ii", combatant.characterUpgrades);

    if (firstHealthUpgrade && !secondHealthUpgrade) {
        value = parseInt(value) + ( parseInt(combatant.level) );
    }
    if (firstHealthUpgrade && secondHealthUpgrade) {
        value = parseInt(value) + ( parseInt(combatant.level) * 2 );
    }

    return value;
};

/* Attack Upgrade */
var applyAttackUpgrades = function(initialValue=0, combatant={}) {
    var value = initialValue;
    const firstAttackUpgrade = hasUpgrade("character-upgrade-002", combatant.characterUpgrades);

    if (firstAttackUpgrade) {
        value = parseInt(value) + ( parseInt(combatant.level) );
    }

    return value;
};