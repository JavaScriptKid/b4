import store from '../../../init/store'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'
import {getPagesFromArray} from '../../../helpers/array-to-pages'

/////////////
/* Up & Down *//////////////////////////////////////////////////////////////////
////////////

export function handleMenuDown(menuModel) {
    //console.log( getBorderingIds(menuModel).nextOptionId )

    const next = getBorderingIds(menuModel).nextOptionId;
    if (next) {
        setBattleValue({
            selectedOptionId: getBorderingIds(menuModel).nextOptionId
        })
    }

}

export function handleMenuUp(menuModel={}) {

    const prev = getBorderingIds(menuModel).prevOptionId;

    if (prev) {
        setBattleValue({
            selectedOptionId: getBorderingIds(menuModel).prevOptionId
        })
    }

}


/**
 * Take in the current menu model, get back the options next and previous from the currently
 * selected option in application state
 * @param menuModel
 * @returns {{prevOptionId: *, nextOptionId: *}}
 */
function getBorderingIds(menuModel) {
    const menuKey = store.getState().battle.menuKey;
    const selectedOptionId = store.getState().battle.selectedOptionId;
    const currentPage = getPagesFromArray( menuModel[menuKey] )[store.getState().battle.menuPageIndex];

    let index = -1;
    currentPage.forEach((option, i) => {
        if (option.optionId == selectedOptionId) {
            index = i;
        }
    });



    //Maybe go to the Back button
    const nextOption = currentPage[index+1];
    let nextOptionId = nextOption ? nextOption.optionId : null;
    if (!nextOptionId && menuKey != "root") {
        nextOptionId = "back"
    }


    //Maybe go up from back
    const prevOption = currentPage[index-1];
    let prevOptionId = prevOption ? prevOption.optionId : null;

    if (selectedOptionId == "back") {
        nextOptionId = "back"; //Don't let DOWN go to the top of the list
        prevOptionId = currentPage[currentPage.length-1].optionId
    }



    return {
        prevOptionId: prevOptionId,
        nextOptionId: nextOptionId
    }
}

/////////////
/* Enter */ /////////////////////////////////////////////////////////////////
////////////

export function handleMenuEnter(menuModel={}) {
    const menuKey = store.getState().battle.menuKey;
    const selectedOptionId = store.getState().battle.selectedOptionId;
    const currentPage = menuModel[menuKey];

    const selectedOptionModel = currentPage.find( (option) => option.optionId == selectedOptionId);

    //Fire the Enter handler of the model
    selectedOptionModel.handleEnter();

}