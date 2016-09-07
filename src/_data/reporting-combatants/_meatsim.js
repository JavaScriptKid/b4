import {allAttacks} from './attack-loadouts'


export default {
    computerAiTraits: {
        vicious: 2,
        protective: 1,
        cursing: 1,
        conservative: 1,
        klepto: 1
    },

    name: "Willy",
    simName: "meatsim",
    level: 3,
    class: "captain",
    skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",

    attacks: [
        ...allAttacks
    ],

    laptopUpgrades: [
        {libraryId: "laptop-upgrade_001"},
        {libraryId: "laptop-upgrade_001"},
        {libraryId: "laptop-upgrade_001"},
    ],
    characterUpgrades: [

        {libraryId: "character-upgrade-005-i"},
        {libraryId: "character-upgrade-005-ii"}
    ]

}