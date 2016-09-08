import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import {doStep} from '../do-step'
import {songEnergeticBattle} from '../../_data/_sfx'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../helpers/single-keypress-binding'


@connect((state, props) => {
    return {
        isShowingIntroScreen: state.battle.isShowingIntroScreen
    }
})


/* This is purely for codepen. We don't want to load the Pen with music playing */
class IntroKickoffScreen extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isShowing: props.isShowingIntroScreen //dont let it revert back
        }
    }

    kickoff() {

        songEnergeticBattle.stop();
        songEnergeticBattle.play('trimmed');


        this.setState({
            isShowing: false
        })
        removeKeyboardSinglePress("intro-overlay-screen")
    }

    componentDidMount() {
        addKeyboardSinglePress(13, () => {

            this.kickoff();

        }, "intro-overlay-screen")
    }



    handleClick(e) {
        e.preventDefault();
        this.kickoff();

        $(".js-textline-autoclick-target").click();
    }

    render() {

        return null; //temp

        if (!this.state.isShowing) {
            return null
        }

        return (
           <div className="start-overlay half is-active">
               <a href="#" onClick={::this.handleClick} className="start-overlay-link">PRESS `ENTER` TO BATTLE</a>
           </div>
        );
    }
}

export default IntroKickoffScreen;