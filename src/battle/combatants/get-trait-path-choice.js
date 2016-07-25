import {randomFromArray} from '../../helpers/random-from-array'

export function getTraitPathChoice(traitProperties={}, casterModel, targetModel) {

    const chosenTrait = randomFromArray( concatTraits(traitProperties) );
    console.log(chosenTrait); //"protective", "vicious", etc
    const action = getActionFromPathTrait(chosenTrait, casterModel, targetModel);
    console.log(action);
}

import {viciousAiPath} from './ai-paths/vicious-ai-path'
import {protectiveAiPath} from './ai-paths/protective-ai-path'
import {cursingAiPath} from './ai-paths/cursing-ai-path'
import {kleptoAiPath} from './ai-paths/klepto-ai-path'
import {conservativeAiPath} from './ai-paths/conservative-ai-path'
import {randomAiPath} from './ai-paths/random-ai-path'

var getActionFromPathTrait = function(chosenTrait="", casterModel, targetModel) {
    /*
    *   Output Format is {casterId, targetId, actionId, and superChargedFrameworkId=""}
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
    if (chosenTrait == "cursing") {
        result = cursingAiPath(casterModel, targetModel);
    }
    /* KLEPTO */
    if (chosenTrait == "klepto") {
        result = kleptoAiPath(casterModel, targetModel);
    }
    /* CONSERVATIVE */
    if (chosenTrait == "conservative") {
        result = conservativeAiPath(casterModel, targetModel);
    }

    /* Fallback to REASONABLE */
    return result || randomAiPath(casterModel, targetModel);
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