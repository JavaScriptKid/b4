import store from '../../../init/store'
import {getPagesFromArray} from '../../../helpers/array-to-pages'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'

/* Change the attacks and items paging, marked with the slider circles */
export function goToNextSubPage(menuModel={}, changeSelectedOptionId=false) {

    const nextPage = getBorderingPages(menuModel).nextPage;
    setBattleValue({
        menuPageIndex: nextPage
    });

    if (changeSelectedOptionId) {
        const menuKey = store.getState().battle.menuKey;
        const pages = getPagesFromArray( menuModel[menuKey] );
        const nextSelectedId = pages[nextPage][0].optionId;

        setBattleValue({
            selectedOptionId: nextSelectedId
        });
    }


}
export function goToPrevSubPage(menuModel={}, changeSelectedOptionId=false) {

    const prevPage = getBorderingPages(menuModel).prevPage;
    setBattleValue({
        menuPageIndex: prevPage
    });

    if (changeSelectedOptionId) {
        const menuKey = store.getState().battle.menuKey;
        const pages = getPagesFromArray( menuModel[menuKey] );
        const nextSelectedId = pages[prevPage][0].optionId;

        setBattleValue({
            selectedOptionId: nextSelectedId
        });
    }
}



function getBorderingPages(menuModel) {
    const menuPageIndex = store.getState().battle.menuPageIndex;
    const menuKey = store.getState().battle.menuKey;
    const pages = getPagesFromArray( menuModel[menuKey] );
    const lastPage = pages.length - 1;

    const prevPage = menuPageIndex > 0 ? menuPageIndex - 1 : 0;
    const nextPage = menuPageIndex < lastPage ? menuPageIndex + 1 : lastPage;

    return {
        prevPage,
        nextPage
    }
}