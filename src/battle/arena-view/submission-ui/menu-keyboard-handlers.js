import store from '../../../init/store'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'
import {getPagesFromArray} from '../../../helpers/array-to-pages'
import {goToNextSubPage, goToPrevSubPage} from './change-options-subpage'

import {sfxCursorMove} from '../../../_data/_sfx'

/////////////
/* Up & Down *//////////////////////////////////////////////////////////////////
////////////

export function handleMenuDown(menuModel) {
    const next = getBorderingIds(menuModel).nextOptionId;
    if (next) {
        sfxCursorMove.play();
        setBattleValue({
            selectedOptionId: getBorderingIds(menuModel).nextOptionId
        })
    }

}

export function handleMenuUp(menuModel={}) {

    const prev = getBorderingIds(menuModel).prevOptionId;

    if (prev) {
        sfxCursorMove.play();
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

    if (["back", "prev-page", "next-page"].indexOf(selectedOptionId) > -1) {
        nextOptionId = selectedOptionId; //Don't let DOWN go to the top of the list
        prevOptionId = currentPage[currentPage.length-1].optionId
    }



    return {
        prevOptionId: prevOptionId,
        nextOptionId: nextOptionId
    }
}


/////////////
/* Left & Right */ /////////////////////////////////////////////////////////////////
////////////

export function handleMenuLeft(menuModel) {

    const {
        menuKey,
        menuPageIndex,
        selectedOptionId
    } = store.getState().battle;

    //Move back to Root if on First page of results;
    if (menuKey != "root") {

        const reservedOptions = ["next-page", "prev-page", "back"];
        if ( reservedOptions.indexOf(selectedOptionId) === -1) {

            //Go from first results page back to root
            if (menuPageIndex == 0) {
                //Same as ESC
                setBattleValue({
                    menuKey: "root",
                    menuPageIndex: 0
                })
            } else {
                //Go backwards from deeper results page
                goToPrevSubPage(menuModel)
            }
        }
    }



    if (selectedOptionId == "next-page") {
        setBattleValue({
            selectedOptionId: "prev-page"
        })
    }
    if (selectedOptionId == "prev-page") {
        setBattleValue({
            selectedOptionId: "back"
        })
    }
}

export function handleMenuRight(menuModel={}) {
    const menuKey = store.getState().battle.menuKey;
    const selectedOptionId = store.getState().battle.selectedOptionId;
    const currentPage = menuModel[menuKey];
    const selectedOptionModel = currentPage.find( (option) => option.optionId == selectedOptionId);

    //Right is the same as Enter on "Attack"
    const rootOptions = [
        "root_super",
        "root_attack",
        "root_special",
        "root_item"
    ];
    if ( rootOptions.indexOf(selectedOptionId) > -1) {
        selectedOptionModel.handleEnter();
        return
    }

    //Move from Back and Previous
    if (selectedOptionId == "back") {
        setBattleValue({
            selectedOptionId: "prev-page"
        });
        return
    }
    if (selectedOptionId == "prev-page") {
        setBattleValue({
            selectedOptionId: "next-page"
        });
        return
    }

    //If on a results page, go to the next result page
    goToNextSubPage(menuModel)
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
    if (selectedOptionModel) {
        selectedOptionModel.handleEnter();
    } else {
        // It's [probably] a BACK or ARROW button

        if (selectedOptionId == "back") {
            setBattleValue({
                menuKey: "root",
                menuPageIndex: 0
            })
        }

        if (selectedOptionId == "prev-page") {
            goToPrevSubPage(menuModel)
        }

        if (selectedOptionId == "next-page") {
            goToNextSubPage(menuModel)
        }

    }

}

/////////////
/* Esc */ /////////////////////////////////////////////////////////////////
////////////
export function handleMenuEsc(menuModel={}) {
    const menuKey = store.getState().battle.menuKey;

    if (menuKey != "root") {
        setBattleValue({
            menuKey: "root",
            menuPageIndex: 0
        })
    }
}
