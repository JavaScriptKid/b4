import Actions from '../../../_data/battle-actions'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'
import {getSubmission} from '../../submissions/get-submission'
import {addSubmission} from '../../submissions/add-submission'

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


var getAttackOptionModels = function(list) {
    return list.map(atkId => {
        const model = Actions[atkId];
        return {
            ...optionSchema,
            labelText: model.name,
            supportText: model.ppCost > 0 ? `PP ${model.ppCost}` : "",
            handleEnter() {
                const submissionModel = getSubmission(atkId, null);
                addSubmission(submissionModel);
            }
        };
    });
};

export function getSubmissionMenuStructure(casterModel, menuLevel="", menuStartingIndex=0) {


    /* Normal attacks */
    if (menuLevel == "attacks") {

        const normalAttacks = casterModel.attacks.filter(atkId => {
            const model = Actions[atkId];
            return model.type == "Normal"
        });

        const attackOptions = getAttackOptionModels(normalAttacks);
        const attackItems = filterOptionsByTest(attackOptions, menuStartingIndex);
        return {
            items: attackItems,
            totalItemCount: normalAttacks.length
        }
    }

    /* Special attacks */
    if (menuLevel == "special") {

        const specialAttacks = casterModel.attacks.filter(atkId => {
            const model = Actions[atkId];
            return model.type == "Special"
        });

        const attackOptions = getAttackOptionModels(specialAttacks);
        const attackItems = filterOptionsByTest(attackOptions, menuStartingIndex);
        return {
            items: attackItems,
            totalItemCount: specialAttacks.length
        }
    }

    /* Special attacks */
    if (menuLevel == "items") {

        const casterItems = casterModel.items;
        const attackOptions = getAttackOptionModels(casterItems);
        const attackItems = filterOptionsByTest(attackOptions, menuStartingIndex);
        return {
            items: attackItems,
            totalItemCount: casterItems.length
        }
    }


    /* Default - root level menu */
    const items = filterOptionsByTest([
        {
            ...optionSchema,
            labelText: "SUPER CHARGE",
            supportText: "...",
            customClasses: "",
            filterPresenceTest: function() {
                return casterModel.isDangerMeterUsable()
            }
        },
        {
            ...optionSchema,
            labelText: "ATTACK",
            handleEnter() {
                const nextMenu = getSubmissionMenuStructure(casterModel, "attacks", 0);
                setBattleValue({
                    menuLevel: "attacks",
                    menuOptionIndex: 1, //this might go away
                    selectedOptionId: nextMenu.items[0].optionId
                })
            },
            supportText: "..."
        },
        {
            ...optionSchema,
            labelText: "SPECIAL",
            handleEnter() {
                setBattleValue({
                    menuOptionIndex: 1, //this might go away
                    menuLevel: "special"
                })
            },
            supportText: "..."
        },
        {
            ...optionSchema,
            labelText: "ITEM",
            handleEnter() {
                setBattleValue({
                    menuOptionIndex: 1, //this might go away
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