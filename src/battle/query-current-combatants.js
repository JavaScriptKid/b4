/* A reusable way to query the combatants*/
//Example: Getting the challenger, getting the dead guy, etc
import {CombatantModel} from './combatant-model'

//You should pass in whichever history item you want
export function getCombatantsByQuery(stateCombatants, queryFunction) {

    return Object.keys(stateCombatants).map(cId => {
        const properties = stateCombatants[cId];
        return new CombatantModel(properties);
    }).filter(cModel => {
        return queryFunction(cModel);
    });

}