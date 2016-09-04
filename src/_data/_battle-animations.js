import React from 'react'
import Tada from '../battle/arena-view/animations/animation-tada'
import Fury from '../battle/arena-view/animations/animation-fury'
import Slice from '../battle/arena-view/animations/animation-slice'
import Preloaded from '../battle/arena-view/animations/animation-preloaded'
import Commit from '../battle/arena-view/animations/animation-commit'
import Zen from '../battle/arena-view/animations/animation-zen'
import SlideOutDown from '../battle/arena-view/animations/animation-slide-out-down'
import Die from '../battle/arena-view/animations/animation-die'
import Iterate from '../battle/arena-view/animations/animation-iterate'



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
    },

    iterate(actionDescription) {
        return <Iterate casterId={actionDescription.casterId} repetitionsCount={actionDescription.repetitionsCount} />
    },

    slice(actionDescription) {
        return (
            <Slice
                casterId={actionDescription.casterId}
                isPlayer={!actionDescription.isCasterComputerControlled}
            />
        );
    },

    preloaded(actionDescription) {
        return <Preloaded casterId={actionDescription.casterId} />
    },

    commit(actionDescription) {
        return <Commit casterId={actionDescription.casterId} />
    },

    die(actionDescription) { //caster is the person who ran out of HP
        return <Die casterId={actionDescription.casterId} />
    }


    //shootingStar(event) {
    //    return <ShootingStar event={event} />
    //},
}