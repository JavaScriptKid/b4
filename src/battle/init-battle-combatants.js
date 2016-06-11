import { setBattleValue } from '../redux-action-creators/battle-action-creators'
import makeId from '../helpers/make-id'


export default function() {

    var combatants = {};

    combatants[makeId('combatant')] = {
        name: "Some Dude A",
        level: 1,
        class: "ninja",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg"
    };

    combatants[makeId('combatant')] = {
        name: "Some Dude B",
        level: 1,
        class: "captain",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg"
    };


    /* Fresh kickoff of battle */
    setBattleValue({
        combatants: {
            ...combatants
        }
    })
}