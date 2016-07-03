import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import initialCombatantProperties from './initial-combatant-properties'

import makeId from '../helpers/make-id'


export default function() {

    var combatants = {};

    const id1 = makeId('combatant');
    const id2 = makeId('combatant');

    combatants[id1] = {
        ...initialCombatantProperties,

        id: id1,
        name: "Jacob",
        level: 3,
        hp: 48,
        status: "normal",
        class: "ninja",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
        laptopUpgrades: [
            { libraryId: "laptop-upgrade_001", isEnabled: true },
            { libraryId: "laptop-upgrade_002", isEnabled: true },
            { libraryId: "laptop-upgrade_003", isEnabled: true } /* can be disabled by special attacks? */
        ],
        characterUpgrades: [
            { libraryId: "character-upgrade-001-i" }
        ]
    };

    combatants[id2] = {
        ...initialCombatantProperties,

        id: id2,
        name: "Travis",
        level: 3,
        class: "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",
        laptopUpgrades: [],
        characterUpgrades: [
            {libraryId: "character-upgrade-005-i"},
            {libraryId: "character-upgrade-005-ii"}
        ]
    };


    /* Fresh kickoff of battle */
    setBattleValue({
        history: [
            {
                cloudQueue: [],
                combatants: {
                    ...combatants
                }
            }
        ]
    })
}