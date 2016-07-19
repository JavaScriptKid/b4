import React from 'react'
import Tada from '../battle/arena-view/animations/animation-tada'
//import SlideOutDown from '../animations/animation-slide-out-down'
//import ShootingStar from '../animations/animation-shooting-star'
//import ForEach1 from '../animations/animation-forEach1'

export default {
    tada(actionDescription) {
        return <Tada casterId={actionDescription.casterId} />
    }
    //slideOutDown(event) {
    //    return <SlideOutDown event={event} />
    //},
    //shootingStar(event) {
    //    return <ShootingStar event={event} />
    //},
    //forEach1(event) {
    //    return <ForEach1 event={event} />
    //}
}