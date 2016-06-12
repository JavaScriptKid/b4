import Upgrades from '../_data/_laptop-upgrades'
//import Frameworks from '../_data/_frameworks'


var combineStats = function(propertyName, modelList=[]) {
    const stat = modelList.map(u => {
        return u[propertyName]
    });

    if (stat.length) {
        return stat.reduce((a,b) => { return a+b })
    }

    return 0;
};


export function getAlignmentByUpgrades(upgrades=[]) {
    const upgradeModels = upgrades.map(upgrade => {
        return Upgrades[upgrade.libraryId];
    });

    return {
        f1Alignment: combineStats("alignmentPointsF1", upgradeModels),
        f2Alignment: combineStats("alignmentPointsF2", upgradeModels),
        f3Alignment: combineStats("alignmentPointsF3", upgradeModels),
        f4Alignment: combineStats("alignmentPointsF4", upgradeModels)
    }
}