import Frameworks from '../../_data/_frameworks'

/*
    Sketchpad
 f1Alignment
 f2Alignment
 f3Alignment
 f4Alignment


 function(action, currentDescription)
 //action has chosenFramework property. action.chosenFramework




Variables: initialDamage, frameworkUsed, casterModel, targetModel


*/

export function applyFrameworkBonus(initialDamage, frameworkUsed, casterModel, targetModel) {

    //const damage = initialDamage * -1;

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

    console.log('additions', additions);
    console.log('subtractions', subtractions);
    console.log('---')

    const frameworkPointsValue = casterModel[frameworkModel.playerProperty];
    const percentageAddition = (additions - subtractions) * 0.1; //10% for each point
    const roundedPercent = Math.round( percentageAddition * 10) / 10;

    console.log('initial', initialDamage);
    console.log('frameworkPointsValue', frameworkPointsValue);
    console.log('roundedPercent', roundedPercent);
    const totalBeforeDynamics = initialDamage - frameworkPointsValue;

    const totalValue = totalBeforeDynamics - Math.round(totalBeforeDynamics * -roundedPercent);

    console.log('totalValue', totalValue);

    //TODO: This isn't quite there yet
    return totalValue;
}






/*
    The Rules:

    Entire Damage = usual attack damage + ( chosen framework upgrade * dangerMeter % )




    If you're strong against a framework, multiply damage by 1.5
    1:1 ratio: 1.5


    For each strength point, add 5% damage
    For each weakness point, subtract 3%


     Vector: 2
     > Palm: 3,
     EndGame: 2,
     = Entire damage + 4%;

     Vector: 0
     > Palm: 3,
     EndGame: 2,
     = Entire damage + 10%;



    If you're strong against a framework, multiply damage by 0.5.

 */
