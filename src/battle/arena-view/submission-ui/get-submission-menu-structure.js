import Actions from '../../../_data/battle-actions'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'

const optionSchema = {
    optionId: "some_unique_id",
    labelText: "some option",
    supportText: "",
    customClasses: "",
    descriptionBarText: "",
    handleEnter() {
        return;
    },
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
                supportText: `PP ${model.ppCost}`,
                handleEnter() {
                    console.log('submission!')
                }
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
            handleEnter() {
                const nextMenu = getSubmissionMenuStructure(casterModel, "attacks", 0);
                setBattleValue({
                    menuLevel: "attacks",
                    selectedOptionId: nextMenu.items[0].optionId
                })
            },
            supportText: "..."
        },
        {
            ...optionSchema,
            labelText: "Special",
            handleEnter() {
                setBattleValue({
                    menuLevel: "special"
                })
            },
            supportText: "..."
        },
        {
            ...optionSchema,
            labelText: "Item",
            handleEnter() {
                setBattleValue({
                    menuLevel: "items"
                })
            },
            supportText: "..."
        }
    ]);
    return {
        items: items,
        totalItemCount: items.length
    }
}