import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import {getCombatantStats} from './get-combatant-stats'
import initialCombatantProperties from './initial-combatant-properties'

import makeId from '../helpers/make-id'


export default function(c1, c2) {


    const id1 = c1.simName;
    const id2 = c2.simName;


    const initialComb1 = {
        isComputerControlled: false,
        id: id1,
        ...c1
    };

    const initialComb2 = {

        isComputerControlled: true,
        id: id2,
        ...c2
    };


    var combatants = {};
    const stats1 = getCombatantStats(initialComb1);
    const stats2 = getCombatantStats(initialComb2);


    combatants[id1] = {
        ...initialCombatantProperties,
        ...initialComb1,
        ...stats1,
         //hp: initialComb1.hp || stats1.maxHp,
         //pp: initialComb1.pp || stats1.maxPp
        hp: stats1.maxHp,
        pp: stats1.maxPp,
        //pp: 2,
        //dangerMeter: 99,
        speedModifier: 999
    };
    combatants[id2] = {
        ...initialCombatantProperties,
        ...initialComb2,
        ...stats2,
        // hp: initialComb2.hp || stats2.maxHp,
        // pp: initialComb2.pp || stats2.maxPp
        hp: 1,//stats2.maxHp,
        pp: stats2.maxPp,

        isChallenger: true
        //dangerMeter: 99
    };


    //console.log('kickoff', combatants)

    /* Fresh kickoff of battle */
    setBattleValue({
        history: [
            {
                cloudQueue: [],
                combatants: {
                    ...combatants
                },
                currentTurnIndex: 0
            }
        ],
        //adds
        turnRolloutHistoryEntries: [
            { turnId: 0, steps: [] }
        ],
        rollout: [
        ],
        currentAnimation: null,

        submissions: [
        ],
        devTimeTravelTurn: 0,
        showEndingOverlay: false,
        isBattleOver: false

    })
}