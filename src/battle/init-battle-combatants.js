import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import makeId from '../helpers/make-id'


export default function() {

    var combatants = {};

    combatants[makeId('combatant')] = {
        name: "Some Dude A",
        level: 3,
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

    combatants[makeId('combatant')] = {
        name: "Some Dude B",
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
        combatants: {
            ...combatants
        }
    })
}