import Player from './_player'
import Meatsim from './_meatsim'
import Thief from './_thief'
import Knight from './_knight'

import {allItems} from './item-loadouts'
import {allAttacks} from './attack-loadouts'


export default {
    "player": {
        ...Player,
        items: [...allItems]
    },
    "meatsim": {
        ...Meatsim,
        items: [...allItems]
    },
    "thief": {
        ...Thief,
        items: [...allItems]
    },
    "knight": {
        ...Knight,
        items: [...allItems]
    },
}


/* Generate possibilities */

import {generateVariations} from '../../helpers/combination-generator'


var getPersonalityString = function(obj) {
    return Object.keys(obj).map(key => {
        return String(obj[key]);
    }).join("");
};

export function getGeneratedCharacters() {
    const personalityVariations = [
        {property: "vicious", possibilities: [1, 5]},
        {property: "protective", possibilities: [1,  5]},
        {property: "cursing", possibilities: [1, 5]},
        {property: "conservative", possibilities: [1, 3, 5]},
        {property: "klepto", possibilities: [1,  5]}
    ];
    const personalityPossibilities = [{
        vicious: 1,
        protective: 1,
        cursing: 1,
        conservative: 1,
        klepto: 1
    }]//generateVariations(personalityVariations);


    const variations = [
        {
            property: "level", possibilities: [1, 3, 5, 10, 20]
        },
        {property: "class", possibilities: ["ninja", "captain", "monk"]},
        {property: "computerAiTraits", possibilities: personalityPossibilities}
    ];

    const models = generateVariations(variations).map(function(v) {
        const id = `${v.class}-${v.level}-${getPersonalityString(v.computerAiTraits)}`;
        return {
            ...v,
            id: id,
            simName: id,
            name: id,
            isComputerControlled: true,
            attacks: [...allAttacks],
            items: [...allItems]
        }
    });

    var payload = {};
    models.forEach(m => {
        payload[m.id] = { ...m}
    });
    return payload

}