import Actions from '../../../_data/battle-actions'
import MenuOptionSchema from './menu-option-schema'
import {changeMenuPage} from './change-menu-page'
import {getSubmission} from '../../submissions/get-submission'
import {addSubmission} from '../../submissions/add-submission'
import {sfxSubmitAction} from '../../../_data/_sfx'

export function getMenuModel(casterModel) {


    const allAttacks = casterModel.isOutOfUsablePp()
        ? ["attack-000-a", ...casterModel.getAllAttacks()]  //Maybe include Insult in UI
        : casterModel.getAllAttacks();


    const attack = filterActionsByType(allAttacks, "Normal");
    const special = filterActionsByType(casterModel.attacks, "Special");


    const superChargedAttacks = ["attack-001-a"]; //TODO? Make separate attacks for the Framework names?

    return {
        structure: {
            root: getTopLevelMenu(casterModel),
            superCharge: superChargedAttacks.map((a,i) => generateOptionFromActionId(a, `super_${a}_${i}`, casterModel)),
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
        descriptionBarText: "SUPER CHARGE > Unleash Danger Meter in a powerful blow",
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
        descriptionBarText: "ATTACK > Offensive hacking commands",
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
        descriptionBarText: "SPECIAL > Wizardy computer science magic",
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
        descriptionBarText: "ITEM > Usable utilities in your bag",
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
var filterActionsByType = function(actionList, type="") {
    return actionList.filter(aId => {
        const model = Actions[aId];
        return model.type === type
    });
};

/* Utility for generating config for specific action */
var generateOptionFromActionId = function(actionId, optionId, casterModel) {
    const model = Actions[actionId];


    let descriptionBarText = `${model.name.toUpperCase()} > ${model.description}`;

    const isDeactivated = model.ppCost > casterModel.pp;
    if (isDeactivated) {
        descriptionBarText = `NOT AVAILABLE! INSUFFICIENT PP`
    }

    return {
        ...MenuOptionSchema,
        optionId: optionId,
        labelText: model.name,
        supportText: model.ppCost > 0 ? `PP ${model.ppCost}` : "",
        customClasses: "",
        descriptionBarText: descriptionBarText,
        isDeactivated: isDeactivated,
        handleEnter() {
            if (!this.isDeactivated) {

                sfxSubmitAction.play(); //Play submission sound effect
                const submissionModel = getSubmission(actionId, null);
                addSubmission(submissionModel);
            }
        }
    }
};