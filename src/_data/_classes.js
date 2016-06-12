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
        hpGrowthPattern: grow(20, Presets.standardHp),
        ppGrowthPattern: grow(15, Presets.standardHp),
        atkGrowthPattern: grow(10, Presets.fastStat),
        defGrowthPattern: grow(10, Presets.slowStat),
        specGrowthPattern: grow(10, Presets.standardStat),
        spdGrowthPattern: grow(10, Presets.slowStat)
    },
    "monk": {
        ...ClassSchema,
        hpGrowthPattern: grow(20, Presets.standardHp),
        ppGrowthPattern: grow(15, Presets.fastHp),
        atkGrowthPattern: grow(10, Presets.slowStat),
        defGrowthPattern: grow(10, Presets.fastStat),
        specGrowthPattern: grow(10, Presets.fastStat),
        spdGrowthPattern: grow(10, Presets.slowStat)
    },
    "captain": {
        ...ClassSchema,
        hpGrowthPattern: grow(20, Presets.fastHp),
        ppGrowthPattern: grow(15, Presets.standardHp),
        atkGrowthPattern: grow(10, Presets.slowStat),
        defGrowthPattern: grow(10, Presets.fastStat),
        specGrowthPattern: grow(10, Presets.standardStat),
        spdGrowthPattern: grow(10, Presets.standardStat)
    }
};