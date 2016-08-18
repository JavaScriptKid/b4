import Actions from '../../../_data/battle-actions'
import MenuOptionSchema from './menu-option-schema'
import {changeMenuPage} from './change-menu-page'
import {getSubmission} from '../../submissions/get-submission'
import {addSubmission} from '../../submissions/add-submission'

export function getMenuModel(casterModel) {

    const attack = filterActionsByType(casterModel.getAllAttacks(), "Normal", casterModel.pp);
    const special = filterActionsByType(casterModel.attacks, "Special", casterModel.pp);

    return {
        structure: {
            root: getTopLevelMenu(casterModel),
            superCharge: [],
            attack: attack.map((a,i) => generateOptionFromActionId(a, `attack_${a}_${i}`, casterModel)),
            special: special.map((a,i) => generateOptionFromActionId(a, `special_${a}_${i}`, casterModel)),
            items: [...casterModel.items].map((a,i) => generateOptionFromActionId(a, `item_${a}_${i}`, casterModel))
        }
    }
}

/* Utility for getting Top Level Menu */
var getTopLevelMenu = function(casterModel) {
    const superOption = {
        ...MenuOptionSchema,
        optionId: "root_super",
        labelText: "SUPER CHARGE",
        supportText: "...",
        customClasses: "",
        handleEnter() {
            changeMenuPage("superCharge");
        }
    };
    const attackOption = {
        ...MenuOptionSchema,
        optionId: "root_attack",
        labelText: "ATTACK",
        supportText: "...",
        customClasses: "",
        handleEnter() {
            changeMenuPage("attack");
        }
    };
    const specialOption = {
        ...MenuOptionSchema,
        optionId: "root_special",
        labelText: "SPECIAL",
        supportText: "...",
        customClasses: "",
        handleEnter() {
            changeMenuPage("special");
        }
    };
    const itemOption = {
        ...MenuOptionSchema,
        optionId: "root_item",
        labelText: "ITEM",
        supportText: "...",
        customClasses: "",
        handleEnter() {
            changeMenuPage("items");
        }
    };

    return [
        casterModel.isDangerMeterUsable() ? superOption : null,
        attackOption,
        specialOption,
        itemOption
    ].filter( option => option !== null);
};

/* Utility for getting Type of actions */
var filterActionsByType = function(actionList, type="", currentPp) {
    return actionList.filter(aId => {
        const model = Actions[aId];
        return model.type === type
    });
};

/* Utility for generating config for specific action */
var generateOptionFromActionId = function(actionId, optionId, casterModel) {
    const model = Actions[actionId];
    return {
        ...MenuOptionSchema,
        optionId: optionId,
        labelText: model.name,
        supportText: model.ppCost > 0 ? `PP ${model.ppCost}` : "",
        customClasses: "",
        isDeactivated: model.ppCost > casterModel.pp,
        handleEnter() {
            if (!this.isDeactivated) {
                const submissionModel = getSubmission(actionId, null);
                addSubmission(submissionModel);
            }
        }
    }
};