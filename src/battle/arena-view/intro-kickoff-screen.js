import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'

import {songEnergeticBattle} from '../../_data/_sfx'

@connect((state, props) => {
    return {
        isShowingIntroScreen: state.battle.isShowingIntroScreen
    }
})


/* This is purely for codepen. We don't want to load the Pen with music playing */
class IntroKickoffScreen extends React.Component {

    handleClick(e) {
        e.preventDefault();

        songEnergeticBattle.play();

        setBattleValue({
            isShowingIntroScreen: false
        })
    }

    render() {

        return null; //temp

        if (!this.props.isShowingIntroScreen) {
            return null
        }

        return (
           <div className="start-overlay half is-active">
               <a href="#" onClick={::this.handleClick} className="start-overlay-link">BEGIN BATTLE</a>
           </div>
        );
    }
}

export default IntroKickoffScreen;