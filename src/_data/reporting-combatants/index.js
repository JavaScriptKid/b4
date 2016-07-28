import Meatsim from './_meatsim'
import Thief from './_thief'
import Knight from './_knight'

import {allItems} from './item-loadouts'


export default {
    "meatsim": {
        ...Meatsim,
        items: [...allItems]
    },
    "thief": {
        ...Thief,
        items: [...allItems]
    },
    "knight": {
        ...Knight,
        items: [...allItems]
    },
}