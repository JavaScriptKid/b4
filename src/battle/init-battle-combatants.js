import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import {getCombatantStats} from './get-combatant-stats'
import initialCombatantProperties from './initial-combatant-properties'

import makeId from '../helpers/make-id'

//Dev only: seed these characters with all possible attacks
//import normalAttacks from '../_data/battle-actions/_normal-attacks'
//import specialAttacks from '../_data/battle-actions/_special-attacks'


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
        //hp:1
    };
    combatants[id2] = {
        ...initialCombatantProperties,
        ...initialComb2,
        ...stats2,
        // hp: initialComb2.hp || stats2.maxHp,
        // pp: initialComb2.pp || stats2.maxPp
        //hp: stats2.maxHp,
        hp:1,
        pp: stats2.maxPp,
    };


    console.log('kickoff', combatants)

    /* Fresh kickoff of battle */
    setBattleValue({
        history: [
            {
                cloudQueue: [],
                combatants: {
                    ...combatants
                }
            }
        ],
        //adds
        turnRolloutHistoryEntries: [
            { turnId: 0, steps: [] }
        ],
        rollout: [
            //{type:"message", content: ["Begin Hack Battle"]}
        ],
        currentAnimation: null,

        submissions: [],
        devTimeTravelTurn: 0,
    })
}