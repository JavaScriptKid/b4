const ClassSchema = {
    description: "Some description",
    hpGrowthPattern: [2],
    ppGrowthPattern: [2],
    atkGrowthPattern: [2],
    defGrowthPattern: [2],
    specGrowthPattern: [2],
    spdGrowthPattern: [2]
};

const Presets = {
    "fastHp": [2, 3, 3],
    "standardHp": [2],
    "slowHp": [2, 1, 1],

    "fastStat": [2, 2, 2, 1 ],
    "standardStat": [2,1],
    "slowStat": [1, 1, 1, 2]
};

var grow = function(initialValue, growthPattern) {
    var steps = [];
    var value = initialValue;
    var growthIndex = 0;

    for (var i=1; i <= 30; i++) {

        if (i > 1) {
            value += growthPattern[growthIndex];
            var nextIndex = growthIndex+1;
            growthIndex = (growthPattern[nextIndex]) ? nextIndex : 0;
        }
        steps.push( value )

    }
    return steps;
};


export default {
    "ninja": {
        ...ClassSchema,
        hpGrowthPattern: Presets.standardHp,
        ppGrowthPattern: [2], //finish filling these out...
        atkGrowthPattern: [2],
        defGrowthPattern: [2],
        specGrowthPattern: [2],
        spdGrowthPattern: [2],
    }
};