import Actions from '../../../_data/battle-actions'

const optionSchema = {
    labelText: "some option",
    customClasses: "",
    descriptionBarText: "",
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
    }).map(optionModel => {
        return {
            ...optionModel,
            isDisabled: optionModel.filterDisabledTest()
        }
    });
};

export function getSubmissionMenuStructure(casterModel, menuLevel="", menuStartingIndex=0) {


    /* Normal attacks */
    if (menuLevel == "attacks") {
        const attackOptions = casterModel.attacks.filter(atkId => {
            const model = Actions[atkId];
            return model.type == "Normal"
        }).map(atkId => {
            const model = Actions[atkId];
            return {
                ...optionSchema,
                labelText: model.name,
            };
        });

        return filterOptionsByTest([
            ...attackOptions,
            ...
        ]);
    }

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