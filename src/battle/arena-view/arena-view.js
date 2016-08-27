import React from 'react'
import { connect } from 'react-redux'
import BattleAnimations from '../../_data/_battle-animations'
import CombatantScoreboard from './combatant-scoreboard'
import DescriptionBar from './description-bar'
import SubmissionMenu from './submission-ui/submission-menu'
import ArenaCombatant from './arena-combatant'
import AutoSubmitter from './auto-submitter'
import ArenaBackground from './arena-background'

import IntroKickoffScreen from './intro-kickoff-screen' //CodePen only
import EndingOverlay from './ending-overlay'

import { CombatantModel } from '../combatant-model'
import {turnCombatantsForRollout} from './turn-combatants'
import {getCombatantsByQuery} from '../query-current-combatants'

@connect((state, props) => {

    const combatants = state.battle.history[state.battle.devTimeTravelTurn].combatants;
    const combatantIds = Object.keys(combatants);
    const playerProperties = state.battle.history[state.battle.devTimeTravelTurn].combatants[combatantIds[0]];


    //Get Challenger and Challengee
    const challenger = getCombatantsByQuery(combatants, function(combatantModel) {
        return combatantModel.isChallenger;
    })[0];
    const challengee = getCombatantsByQuery(combatants, function(combatantModel) {
        return !combatantModel.isChallenger;
    })[0];

    return {
        challengerModel: challenger,
        challengeeModel: challengee,
        playerModel: new CombatantModel(playerProperties),
        isRollout: state.battle.submissions.length == combatantIds.length,
        combatantIds: combatantIds,
        vW: Math.round(state.map.viewportWidth / 100),
        currentAnimation: state.battle.currentAnimation,
        isIntro: state.battle.isShowingIntroScreen
    }
})

class BattleArenaView extends React.Component {

    componentDidMount() {
        //Face towards each other for intro
        turnCombatantsForRollout();
    }

    renderAnimation() {
        if (!this.props.currentAnimation) {
            return null
        }
        const animationComponentFunction = BattleAnimations[this.props.currentAnimation.animationId];
        return animationComponentFunction(this.props.currentAnimation.actionDescription);
    }

    render() {

        const scoreboardContainerStyle = {
            padding: this.props.vW * 1
        };

        const rolloutClass = this.props.isRollout ? "is-rollout" : "";

        const isBigMessageBoard = (this.props.isRollout || this.props.isIntro);
        return (
           <div className={`battle-arena ${rolloutClass}`}>
               <ArenaBackground />


               <div style={scoreboardContainerStyle} className="scoreboards">
                   <CombatantScoreboard combatantId={this.props.combatantIds[0]} />
                   <CombatantScoreboard combatantId={this.props.combatantIds[1]} />
               </div>

               <ArenaCombatant isRollout={this.props.isRollout} vW={this.props.vW} isPlayer={false} combatantId={this.props.combatantIds[1]} />
               <ArenaCombatant isRollout={this.props.isRollout} vW={this.props.vW} isPlayer={true} combatantId={this.props.combatantIds[0]} />

               {this.renderAnimation()}

               <SubmissionMenu casterModel={this.props.playerModel} hide={isBigMessageBoard} />
               <DescriptionBar
                   isRollout={this.props.isRollout}
                   isIntro={this.props.isIntro}
                   challengerModel={this.props.challengerModel}
                   challengeeModel={this.props.challengeeModel}
               />

               <AutoSubmitter />

               <IntroKickoffScreen />
               <EndingOverlay />
           </div>
        );
    }
}


export default BattleArenaView;