import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import initialCombatantProperties from './initial-combatant-properties'

import makeId from '../helpers/make-id'

//Dev only: seed these characters with all possible attacks
//import normalAttacks from '../_data/battle-actions/_normal-attacks'
//import specialAttacks from '../_data/battle-actions/_special-attacks'

const allAttacks = [
    //"attack-000-a"
    "attack-001-a",
    "attack-002-a",
    "attack-008-a",
    "attack-special-000-a",
    "attack-special-001-a",
    "attack-special-002-a",
    "attack-special-003-a",
    "attack-special-004-a",
    "attack-special-004-b",
    "attack-special-005-a",
    "attack-special-006-a",
    "attack-special-007-a",
    "attack-special-008-a",
    "attack-special-009-a"
];


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

        attacks: [ ...allAttacks],

        laptopUpgrades: [
            { libraryId: "laptop-upgrade_001", isEnabled: true },
            { libraryId: "laptop-upgrade_002", isEnabled: true },
            { libraryId: "laptop-upgrade_003", isEnabled: true } /* can be disabled by special attacks? */
        ],
        characterUpgrades: [
            { libraryId: "character-upgrade-001-i" }
        ],
        items: [
            "item_001",
            "item_002",
            "item_002"
        ],
        speedStatPoints: 3 //Be careful. This should be populated with real stat (Spd)
    };

    combatants[id2] = {
        ...initialCombatantProperties,

        id: id2,
        name: "Travis",
        level: 3,
        class: "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",

        attacks: [ ...allAttacks],

        laptopUpgrades: [],
        characterUpgrades: [
            {libraryId: "character-upgrade-005-i"},
            {libraryId: "character-upgrade-005-ii"}
        ],

        items: [
            "item_003"
        ],
        speedStatPoints: 3 //Be careful. This should be populated with real stat (Spd)
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