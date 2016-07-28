var addVariationsToSet = function(propSet, set = []) {

    const variationsOfProp = propSet.possibilities.map(p => {
        var addition = {};
        addition[propSet.property] = p
        return addition;
    });

    if (set.length == 0) {
        return variationsOfProp;
    }

    var newSet = [];

    set.forEach(s => {

        variationsOfProp.forEach(v => {
            newSet.push({
                ...s,
                ...v
            })
        });

    });
    return newSet;
};



export function generateVariations(array = []) {
    let result = [];
    array.forEach(propSet => {
        var newResults = addVariationsToSet(propSet, result);
        result = [...newResults]
    });
    return result;
}