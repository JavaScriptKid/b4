import Actions from '../../../_data/battle-actions'

const optionSchema = {
    labelText: "some option",
    supportText: "",
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

var filterOptionsByTest = function(initialOptionsList, startIndex) {

    const optionsList = initialOptionsList.splice(startIndex, 4);

    return optionsList.filter(optionModel => {
        return optionModel.filterPresenceTest()
    }).map(optionModel => {
        return {
            ...optionModel,
            isDisabled: optionModel.filterDisabledTest()
        }
    }).filter((optionModel, index) => {
        return index < 4; //4 = page size
    });
};

export function getSubmissionMenuStructure(casterModel, menuLevel="", menuStartingIndex=0) {


    /* Normal attacks */
    if (menuLevel == "attacks") {

        const normalAttacks = casterModel.attacks.filter(atkId => {
            const model = Actions[atkId];
            return model.type == "Normal"
        });

        const attackOptions = normalAttacks.map(atkId => {
            const model = Actions[atkId];
            return {
                ...optionSchema,
                labelText: model.name,
                supportText: `PP ${model.ppCost}`
            };
        });

        const items = filterOptionsByTest(attackOptions, menuStartingIndex);

        return {
            items: items,
            totalItemCount: normalAttacks.length
        }
    }

    /* Default - root level menu */
    const items = filterOptionsByTest([
        {
            ...optionSchema,
            labelText: "Super Charge",
            supportText: "...",
            customClasses: "",
            filterPresenceTest: function() {
                return casterModel.isDangerMeterUsable()
            }
        },
        {
            ...optionSchema,
            labelText: "Attack",
            supportText: "..."
        },
        {
            ...optionSchema,
            labelText: "Special",
            supportText: "..."
        },
        {
            ...optionSchema,
            labelText: "Item",
            supportText: "..."
        }
    ]);
    return {
        items: items,
        totalItemCount: items.length
    }
}