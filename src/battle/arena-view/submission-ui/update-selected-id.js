import store from '../../../init/store'
import {getMenuModel} from './get-menu-model'
import {CombatantModel} from '../../combatant-model'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'


/* Generate a new model based on the newMenuKey and select the first option of the new page */
export function updateSelectedId(newMenuKey, oldMenuKey) {

    const combatantIds = Object.keys(store.getState().battle.history[store.getState().battle.devTimeTravelTurn].combatants);
    const playerProperties = store.getState().battle.history[store.getState().battle.devTimeTravelTurn].combatants[combatantIds[0]];

    const playerModel = new CombatantModel(playerProperties);
    const nextMenu = getMenuModel(playerModel).structure;
    const newPage = nextMenu[newMenuKey];


    /* If going BACK, put to appropriate option */
    //console.log(oldMenuKey)

    if (oldMenuKey == "attack" && newMenuKey == "root") {
        setBattleValue({
            selectedOptionId: "root_attack"
        });
        return;
    }
    if (oldMenuKey == "special" && newMenuKey == "root") {
        setBattleValue({
            selectedOptionId: "root_special"
        });
        return;
    }
    if (oldMenuKey == "items" && newMenuKey == "root") {
        setBattleValue({
            selectedOptionId: "root_item"
        });
        return;
    }


    /* Set to first option in next menu */
    setBattleValue({
        selectedOptionId: newPage[0].optionId
    })



}