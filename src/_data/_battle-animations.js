import React from 'react'
import Tada from '../battle/arena-view/animations/animation-tada'
import Fury from '../battle/arena-view/animations/animation-fury'
import Zen from '../battle/arena-view/animations/animation-zen'
import SlideOutDown from '../battle/arena-view/animations/animation-slide-out-down'


//import SlideOutDown from '../animations/animation-slide-out-down'
//import ShootingStar from '../animations/animation-shooting-star'
//import ForEach1 from '../animations/animation-forEach1'

export default {
    tada(actionDescription) {
        return <Tada casterId={actionDescription.casterId} />
    },
    fury(actionDescription) {
        return <Fury casterId={actionDescription.casterId} />
    },
    zen(actionDescription) {
        return <Zen casterId={actionDescription.casterId} />
    },
    slideOutDown(actionDescription) {

        return (
            <SlideOutDown
                casterId={actionDescription.casterId}
                isPlayer={!actionDescription.isCasterComputerControlled} />
        )
    }
    //shootingStar(event) {
    //    return <ShootingStar event={event} />
    //},
    //forEach1(event) {
    //    return <ForEach1 event={event} />
    //}
}