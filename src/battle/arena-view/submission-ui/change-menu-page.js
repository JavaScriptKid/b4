import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'

export function changeMenuPage(newMenuKey="") {

    setBattleValue({
        menuKey: newMenuKey
    });
}