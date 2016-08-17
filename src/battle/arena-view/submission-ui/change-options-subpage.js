import store from '../../../init/store'
import {getPagesFromArray} from '../../../helpers/array-to-pages'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'

/* Change the attacks and items paging, marked with the slider circles */
export function goToNextSubPage(menuModel={}) {
    setBattleValue({
        menuPageIndex: getBorderingPages(menuModel).nextPage
    })
}
export function goToPrevSubPage(menuModel={}) {
    setBattleValue({
        menuPageIndex: getBorderingPages(menuModel).prevPage
    })
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