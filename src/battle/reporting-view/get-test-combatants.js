import makeId from '../../helpers/make-id'

export default function(Combatants) {
    var generated = {};

    for (var c in Combatants) {
        const id = makeId(Combatants[c].simName, 3);
        generated[id] = {
            id: id,
            ...Combatants[c]
        }
    }

    return generated;
}