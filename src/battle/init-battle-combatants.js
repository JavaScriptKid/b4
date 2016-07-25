import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import {getCombatantStats} from './get-combatant-stats'
import initialCombatantProperties from './initial-combatant-properties'

import makeId from '../helpers/make-id'

//Dev only: seed these characters with all possible attacks
//import normalAttacks from '../_data/battle-actions/_normal-attacks'
//import specialAttacks from '../_data/battle-actions/_special-attacks'

const allAttacks = [
    //"attack-000-a"
    "attack-001-a",
    "attack-002-a",
    "attack-002-b",
    "attack-003-a",
    "attack-004-a",
    "attack-005-a",
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
    "attack-special-009-a",
    "attack-special-010-a",
];


export default function() {


    const id1 = makeId('combatant');
    const id2 = makeId('combatant');


    const initialComb1 = {
        //isComputerControlled: true,
        id: id1,
        name: "Jacob",
        level: 10,
        class: "ninja",
        dangerMeter: 0,
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
        attacks: [ ...allAttacks],
        items: [
            "item_001",
            "item_002",
            "item_002"
        ],
        laptopUpgrades: [
            { libraryId: "laptop-upgrade_001" },

            //{ libraryId: "laptop-upgrade_003" }
        ],
        characterUpgrades: [
            { libraryId: "character-upgrade-001-i" }
        ]
    };

    const initialComb2 = {

        isComputerControlled: true,
        computerAiTraits: {
            vicious: 4,
            protective: 3,
            cursing: 3,
            conservative: 2,
            klepto: 2,
            random: 3
        },

        id: id2,
        name: "Travis",
        level: 10,
        class: "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",

        attacks: [ ...allAttacks],

        laptopUpgrades: [
            { libraryId: "laptop-upgrade_002" },
        ],
        characterUpgrades: [
            {libraryId: "character-upgrade-005-i"},
            {libraryId: "character-upgrade-005-ii"}
        ]

    };


    var combatants = {};
    const stats1 = getCombatantStats(initialComb1);
    const stats2 = getCombatantStats(initialComb2);


    combatants[id1] = {
        ...initialCombatantProperties,
        ...initialComb1,
        ...stats1,
        hp: initialComb1.hp || stats1.maxHp,
        pp: initialComb1.pp || stats1.maxPp
    };
    combatants[id2] = {
        ...initialCombatantProperties,
        ...initialComb2,
        ...stats2,
        hp: initialComb2.hp || stats2.maxHp,
        pp: initialComb2.pp || stats2.maxPp
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
        ],
        //adds
        turnRolloutHistoryEntries: [
            { turnId: 0, steps: [] }
        ],
        rollout: [
            //{type:"message", content: ["Begin Hack Battle"]}
        ],
        currentAnimation: null,

        submissions: [],
        devTimeTravelTurn: 0,
    })
}