import React from 'react'
import { connect } from 'react-redux'
import CombatantScoreboard from './combatant-scoreboard'
import DescriptionBar from './description-bar'
import SubmissionMenu from './submission-ui/submission-menu'
import ArenaCombatant from './arena-combatant'
import { CombatantModel } from '../combatant-model'
import {aiSubmissionWatcher} from '../submissions/ai-submission-watcher'

@connect((state, props) => {

    const combatantIds = Object.keys(state.battle.history[state.battle.devTimeTravelTurn].combatants);
    const playerProperties = state.battle.history[state.battle.devTimeTravelTurn].combatants[combatantIds[0]];

    return {
        playerModel: new CombatantModel(playerProperties),
        isRollout: state.battle.submissions.length == combatantIds.length,
        combatantIds: combatantIds,
        vW: Math.round(state.map.viewportWidth / 100),
        submissions: state.battle.submissions
    }
})

class BattleArenaView extends React.Component {

    componentWillUpdate(newProps) {
        if (newProps.submissions.length != this.props.submissions.length) {
            if (newProps.submissions.length == 0) {
                console.log('submissions are empty. Submit AI ones?')
                //Combatants.filter for AI controlled ones, forEach submit something
            }
        }
    }

    render() {

        const scoreboardContainerStyle = {
            padding: this.props.vW * 1
        };

        const rolloutClass = this.props.isRollout ? "is-rollout" : "";

        return (
           <div className={`battle-arena ${rolloutClass}`}>
               <div style={scoreboardContainerStyle} className="scoreboards">
                   <CombatantScoreboard combatantId={this.props.combatantIds[0]} />
                   <CombatantScoreboard combatantId={this.props.combatantIds[1]} />
               </div>

               <ArenaCombatant isRollout={this.props.isRollout} vW={this.props.vW} isPlayer={true} combatantId={this.props.combatantIds[0]} />
               <ArenaCombatant isRollout={this.props.isRollout} vW={this.props.vW} isPlayer={false} combatantId={this.props.combatantIds[1]} />


               <SubmissionMenu casterModel={this.props.playerModel} hide={this.props.isRollout} />
               <DescriptionBar isRollout={this.props.isRollout} />
           </div>
        );
    }
}


export default BattleArenaView;