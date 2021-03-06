import {allAttacks} from './attack-loadouts'

export default {
    computerAiTraits: {
        vicious: 10,
        protective: 1,
        cursing: 1,
        conservative: 1,
        klepto: 1
    },

    name: "Knight",
    simName: "knight",
    level: 1,
    class: "ninja",
    skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg",

    attacks: [
        //"attack-001-a",
        //"attack-002-a",
        ...allAttacks
    ],

    laptopUpgrades: [
        {libraryId: "laptop-upgrade_002"}
    ],
    characterUpgrades: [
        {libraryId: "character-upgrade-005-i"},
        {libraryId: "character-upgrade-005-ii"}
    ]

}