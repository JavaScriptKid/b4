import {randomFromArray} from '../../helpers/random-from-array'

export function getTraitPathChoice(traitProperties={}, casterModel, targetModel) {

    const chosenTrait = randomFromArray( concatTraits(traitProperties) );
    console.log(chosenTrait) //"protective", "vicious", etc
    const action = getActionFromPathTrait(chosenTrait, casterModel, targetModel);
}

import {viciousAiPath} from './ai-paths/vicious-ai-path'
import {protectiveAiPathAiPath} from './ai-paths/protective-ai-path'

var getActionFromPathTrait = function(chosenTrait="", casterModel, targetModel) {
    /*
    *   Output Format is {casterId, targetId, actionId, and dangerCharge=""}
     */

    let result = null;

    /* VICIOUS */
    if (chosenTrait == "vicious") {
        result = viciousAiPath(casterModel, targetModel);
    }

    /* PROTECTIVE */
    if (chosenTrait == "protective") {
        result = protectiveAiPath(casterModel, targetModel);
    }


    /* CURSING */
    /* KLEPTO */
    /* CONSERVATIVE */

    /* Fallback to REASONABLE */
    return result || {
        //
    }


};






import range from 'lodash/range'
export function concatTraits(traitProperties={}) {

    var result = [];
    for (var key in traitProperties) {
        range(traitProperties[key]).forEach(val => {
            result.push(key)
        });
    }
    return result;
}