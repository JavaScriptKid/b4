import React from 'react'
import { connect } from 'react-redux'
import BattleAnimations from '../../_data/_battle-animations'
import CombatantScoreboard from './combatant-scoreboard'
import DescriptionBar from './description-bar'
import SubmissionMenu from './submission-ui/submission-menu'
import ArenaCombatant from './arena-combatant'
import AutoSubmitter from './auto-submitter'
import ArenaBackground from './arena-background'
import { CombatantModel } from '../combatant-model'
import {turnCombatantsForSubmissions} from './turn-combatants'

@connect((state, props) => {

    const combatantIds = Object.keys(state.battle.history[state.battle.devTimeTravelTurn].combatants);
    const playerProperties = state.battle.history[state.battle.devTimeTravelTurn].combatants[combatantIds[0]];

    return {
        playerModel: new CombatantModel(playerProperties),
        isRollout: state.battle.submissions.length == combatantIds.length,
        combatantIds: combatantIds,
        vW: Math.round(state.map.viewportWidth / 100),
        currentAnimation: state.battle.currentAnimation
    }
})

class BattleArenaView extends React.Component {

    componentDidMount() {
        //This may be temporary
        turnCombatantsForSubmissions();
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

        return (
           <div className={`battle-arena ${rolloutClass}`}>
               <ArenaBackground />


               <div style={scoreboardContainerStyle} className="scoreboards">
                   <CombatantScoreboard combatantId={this.props.combatantIds[0]} />
                   <CombatantScoreboard combatantId={this.props.combatantIds[1]} />
               </div>

               <ArenaCombatant isRollout={this.props.isRollout} vW={this.props.vW} isPlayer={true} combatantId={this.props.combatantIds[0]} />
               <ArenaCombatant isRollout={this.props.isRollout} vW={this.props.vW} isPlayer={false} combatantId={this.props.combatantIds[1]} />

               {this.renderAnimation()}

               <SubmissionMenu casterModel={this.props.playerModel} hide={this.props.isRollout} />
               <DescriptionBar isRollout={this.props.isRollout} />

               <AutoSubmitter />
           </div>
        );
    }
}


export default BattleArenaView;