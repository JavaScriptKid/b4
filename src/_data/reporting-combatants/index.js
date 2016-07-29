import Meatsim from './_meatsim'
import Thief from './_thief'
import Knight from './_knight'

import {allItems} from './item-loadouts'
import {allAttacks} from './attack-loadouts'


export default {
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
    const personalityPossibilities = [{}]//generateVariations(personalityVariations);


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