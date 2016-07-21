import {randomFromArray} from '../../helpers/random-from-array'

export function getTraitPathChoice(traitProperties={}, casterModel, targetModel) {

    const chosenTrait = randomFromArray( concatTraits(traitProperties) );
    console.log(chosenTrait) //"protective", "vicious", etc
}







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