import { setBattleValue } from '../../../redux-action-creators/battle-action-creators'

//Dispatch the new Description text up to application state
export function updateDescriptionText(newId="", menuModel={}) {
    let allOptions = [];
    for (var key in menuModel) {
        allOptions = [...allOptions, ...menuModel[key] ]
    }


    const selectedOption = allOptions.find( (option) => option.optionId == newId);

    let value = selectedOption ? selectedOption.descriptionBarText : "";

    if (newId == "back") {
        value = "BACK to previous menu"
    }

    if (newId == "prev-page") {
        value = "PREVIOUS actions"
    }

    if (newId == "next-page") {
        value = "MORE actions"
    }


    setBattleValue({
        descriptionBarText: value
    })
}