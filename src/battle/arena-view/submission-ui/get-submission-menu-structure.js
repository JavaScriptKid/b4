const optionSchema = {
    labelText: "some option",
    customClasses: "",
    filterPresenceTest: function() {
        return true
    },
    filterDisabledTest: function() {
        //Can I use this to "gray out" certain out of stock options?
        return true
    }
};

var filterOptionsByTest = function(optionsList) {
    return optionsList.filter(optionModel => {
        return optionModel.filterPresenceTest()
    })
};

export function getSubmissionMenuStructure(casterModel, menuLevel="", menuPage="") {


    /* Default - root level menu */
    return filterOptionsByTest([
        {
            ...optionSchema,
            labelText: "Super Charge",
            customClasses: "",
            filterPresenceTest: function() {
                return casterModel.isDangerMeterUsable()
            }
        },
        {
            ...optionSchema,
            labelText: "Attack"
        },
        {
            ...optionSchema,
            labelText: "Special"
        },
        {
            ...optionSchema,
            labelText: "Item"
        }
    ])
}