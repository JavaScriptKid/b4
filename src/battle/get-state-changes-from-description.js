/* Take in the changes from description, and figure out the redux-friendly state changes */

export function getStateChangesFromDescription(dObj, currentState) {



    var nextState = {};

    nextState[dObj.casterId] = {};
    nextState[dObj.targetId] = {};


    /* Properties */
    [
        //Pp
        {forId: dObj["casterId"], descriptionProp: "affectCasterPp", stateProp: "pp", addToOld: true},
        {forId: dObj["targetId"], descriptionProp: "affectTargetPp", stateProp: "pp", addToOld: true},

        //Hp
        {forId: dObj["casterId"], descriptionProp: "affectCasterHp", stateProp: "hp", addToOld: true},
        {forId: dObj["targetId"], descriptionProp: "affectTargetHp", stateProp: "hp", addToOld: true},
        {forId: dObj["casterId"], descriptionProp: "blanketSetCasterHp", stateProp: "hp", addToOld: false},
        {forId: dObj["targetId"], descriptionProp: "blanketSetTargetHp", stateProp: "hp", addToOld: false},

        //Status
        {forId: dObj["casterId"], descriptionProp: "affectCasterStatus", stateProp: "status", addToOld: false},
        {forId: dObj["targetId"], descriptionProp: "affectTargetStatus", stateProp: "status", addToOld: false},

        //Items
        {forId: dObj["casterId"], descriptionProp: "setCasterItemsList", stateProp: "items", addToOld: false},
        {forId: dObj["targetId"], descriptionProp: "setTargetItemsList", stateProp: "items", addToOld: false},

        //Danger Meter
        {forId: dObj["casterId"], descriptionProp: "casterDangerMeter", stateProp: "dangerMeter", addToOld: false},
        {forId: dObj["targetId"], descriptionProp: "targetDangerMeter", stateProp: "dangerMeter", addToOld: false},

        //Time Travel casterCommittedTurnIndex
        {forId: dObj["casterId"], descriptionProp: "casterCommitData", stateProp: "committedTurnData", addToOld: false},
        {forId: dObj["targetId"], descriptionProp: "targetCommitData", stateProp: "committedTurnData", addToOld: false}



    ].forEach( prop => {
        if (Object.keys( dObj ).indexOf(prop.descriptionProp) > -1 ) {
            if (prop.addToOld) {
                nextState[prop.forId][prop.stateProp] = currentState[prop.forId][prop.stateProp] + dObj[prop.descriptionProp];
                return;
            }
            nextState[ prop.forId ][prop.stateProp] = dObj[prop.descriptionProp];
        }
    });

    return {
        ...nextState
    }
}