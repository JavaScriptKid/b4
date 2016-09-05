import normalAttacks from './battle-actions/_normal-attacks'
import specialAttacks from './battle-actions/_special-attacks'
import superAttacks from './battle-actions/_super-attacks'
import itemActions from './battle-actions/_items'
import naturals from './battle-actions/_naturals'

export default {
    /* Attacks */
    ...normalAttacks,
    ...specialAttacks,
    ...superAttacks,
    ...itemActions,
    ...naturals
}
/*
 // TODO: TODO: Insult (should not use Attack stat)
 // TODO: Slice
 // TODO: Slice Mk II
 // TODO: Slice Mk III
 // TODO: Preloaded
 // TODO: Preloaded Mk II
 // TODO: Preloaded Mk III
 // TODO: forEach
 // TODO: forEach Mk II
 // TODO: for Each Mk III
 // TODO: map
 // TODO: map Mk II
 // TODO: map Mk III
 // TODO: reduce
 // TODO: reduce Mk II
 // TODO: reduce Mk III
 // TODO: Curl
 // TODO: Curl Mk II
 // TODO: Steal-and-Use (needs a name)
 // TODO: Promise
 // TODO: -Promise resolve
 TODO: Promise Mk II
 TODO: Promise Mk III
 // TODO: Garbage Jammer
 // TODO: Thrash
 // TODO: -Thrash: Catch on Fire
 TODO: Repeat


 TODO: Commit
 TODO: Revert
 TODO: Stash


 // TODO: Zen
 // TODO: -Come out of Zen
 // TODO: Fury
 // TODO: -Come out of Fury
 // TODO: Throttle
 // TODO: DDoS
 TODO: Rsync
 // TODO: Deadline
 TODO: Redirect
 // TODO: Clean
TODO: Scope Bomb (normal, but stronger against Deadline status)
// TODO: Mitigate

 NATURALS
 // DEATH
 // MEMORY LEAK
 // FIRE
 // LAGGING OUT
 // Recover from LAGGING OUT


 STATUS EFFECTS
 // DONE lag
 // DONE memory-leak
 // DONE fire
 // TODO: zen (++accuracy, --defense)
 // TODO: fury (++attack, --accuracy)
 // deadline  (++speed, weak to Scope Bomb)

 */