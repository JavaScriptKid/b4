import Frameworks from '../../_data/_frameworks'

export function applyFrameworkBonus(initialDamage, frameworkUsed, casterModel, targetModel) {

    const frameworkModel = Frameworks[frameworkUsed];

    //Add up all "strong against" values
    var additions = 0;
    frameworkModel.strongAgainst.forEach(frameworkId => {
        const model = Frameworks[frameworkId];
        additions += targetModel[model.playerProperty];
    });

    //Add up all "weak against" values
    var subtractions = 0;
    frameworkModel.weakAgainst.forEach(frameworkId => {
        const model = Frameworks[frameworkId];
        subtractions += targetModel[model.playerProperty];
    });

    //Potentially upgrade the Target's defense based on "Weakless" Character Upgrades
    subtractions = applyWeaklessUpgrades(subtractions, targetModel);

    const frameworkPointsValue = casterModel[frameworkModel.playerProperty];
    const percentageAddition = (additions - subtractions) * 0.1; //10% for each point
    const roundedPercent = Math.round( percentageAddition * 10) / 10;

    const totalBeforeDynamics = initialDamage - frameworkPointsValue;
    const totalValue = totalBeforeDynamics - Math.round(totalBeforeDynamics * -roundedPercent);

    return totalValue < -1 ? totalValue : -1;
}



/*
    The Rules:

    initialPayload = your damage dealt payload + your framework points

    for each advantage point, add 10% to initialPayload
    for each disadvantage point, subtract 10% from initialPayload

     return the total

 */



/**
 *  Add to the "subtraction" part of the applyFrameworkBonus calculations
 *  Factors in the combModel's upgrades to try to reduce the weakness penalty
 */
import {hasUpgrade} from '../get-combatant-stats'
var applyWeaklessUpgrades = function(currentValue=0, combModel) {

    const upgrades = combModel.characterUpgrades;

    //Second upgrade
    if (hasUpgrade("character-upgrade-006-ii", upgrades)) {
        return currentValue + 2; /* 10% for each point */
    }

    //First upgrade
    if (hasUpgrade("character-upgrade-006-i", upgrades)) {
        return currentValue + 1; /* 10% for each point */
    }

    return currentValue;
};