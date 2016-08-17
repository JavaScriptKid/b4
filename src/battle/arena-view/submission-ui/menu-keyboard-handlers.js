import store from '../../../init/store'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'


export function handleMenuDown(menuModel) {
    console.log( getBorderingIds(menuModel).nextOptionId )

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
    const currentPage = menuModel[menuKey];

    let index = -1;
    currentPage.forEach((option, i) => {
        if (option.optionId == selectedOptionId) {
            index = i;
        }
    });

    return {
        prevOptionId: currentPage[index-1] ? currentPage[index-1].optionId : null,
        nextOptionId: currentPage[index+1] ? currentPage[index+1].optionId : null,
    }
}