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

    //console.log('additions', additions);
    //console.log('subtractions', subtractions);
    //console.log('---')

    const frameworkPointsValue = casterModel[frameworkModel.playerProperty];
    const percentageAddition = (additions - subtractions) * 0.1; //10% for each point
    const roundedPercent = Math.round( percentageAddition * 10) / 10;

    //console.log('initial', initialDamage);
    //console.log('frameworkPointsValue', frameworkPointsValue);
    //console.log('roundedPercent', roundedPercent);

    const totalBeforeDynamics = initialDamage - frameworkPointsValue;
    const totalValue = totalBeforeDynamics - Math.round(totalBeforeDynamics * -roundedPercent);

    console.log('totalValue', totalValue);


    return totalValue < -1 ? totalValue : -1;
}



/*
    The Rules:

    initialPayload = your damage dealt payload + your framework points

    for each advantage point, add 10% to initialPayload
    for each disadvantage point, subtract 10% from initialPayload

     return the total

 */
