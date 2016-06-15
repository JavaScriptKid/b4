import React from 'react'
import { connect } from 'react-redux'
import {setCombatantValue} from '../../redux-action-creators/battle-action-creators'
import {getClassStatsByLevel} from '../get-class-stats-by-level'
import CombatantLaptopUpgradeList from './combatant-laptop-upgrade-list'
import CharacterUpgradeChecklist from './combatant-character-upgrade-checklist'
import Frameworks from '../../_data/_frameworks'
import {getAlignmentByUpgrades} from '../get-alignment-by-upgrades'

@connect((state, props) => {

    //assumes only 2 combatants
    const otherCombatantId = Object.keys(state.battle.combatants).find(id => {
        return id != props.combatantId
    });

    return {
        combatant: state.battle.combatants[props.combatantId] || {},
        opponentCombatant: state.battle.combatants[otherCombatantId] || {}
    }
})

class CombatantCard extends React.Component {

    handleChange() {
        setCombatantValue(this.props.combatantId, {
            name: this.refs.name.value,
            class: this.refs.class.value,
            level: this.refs.level.value,
            skin: this.refs.skin.value
        });
    }

    renderDiff(figA, figB) {
        if (figA > figB) {
            return <span style={{color:"#29C09E"}}>(+{figA - figB})</span>
        }
        return null;
    }

    renderStatsInfo() {
        const stats = getClassStatsByLevel(
            this.props.combatant.class,
            this.props.combatant.level
        );

        const opponentStats = getClassStatsByLevel(
            this.props.opponentCombatant.class,
            this.props.opponentCombatant.level
        );

        return (
            <div>
                <div className="combatant-card-section-label">
                    Stats
                </div>
                <div>
                    <label>HP</label>
                    <span>{stats.maxHp}</span> <span>{this.renderDiff(stats.maxHp, opponentStats.maxHp)}</span>
                </div>
                <div>
                    <label>PP</label>
                    <span>{stats.maxPp}</span> <span>{this.renderDiff(stats.maxPp, opponentStats.maxPp)}</span>
                </div>
                <div>
                    <label>Atk</label>
                    <span>{stats.atk}</span> <span>{this.renderDiff(stats.atk, opponentStats.atk)}</span>
                </div>
                <div>
                    <label>Def</label>
                    <span>{stats.def}</span> <span>{this.renderDiff(stats.def, opponentStats.def)}</span>
                </div>
                <div>
                    <label>Spec</label>
                    <span>{stats.spec}</span> <span>{this.renderDiff(stats.spec, opponentStats.spec)}</span>
                </div>
                <div>
                    <label>Spd</label>
                    <span>{stats.spd}</span> <span>{this.renderDiff(stats.spd, opponentStats.spd)}</span>
                </div>
            </div>
        )
    }

    renderAlignmentInfo() {
        /* TEMPORARY */
        const stats = getAlignmentByUpgrades(this.props.combatant.laptopUpgrades);
        const opponentStats = getAlignmentByUpgrades( this.props.opponentCombatant.laptopUpgrades );
        return (
            <div>
                <div className="combatant-card-section-label">
                    Alignment
                </div>
                {
                    Object.keys(Frameworks).map(frameworkId => {
                        const model = Frameworks[frameworkId];
                        return (
                            <div key={frameworkId}>
                                <label className="label-long">{model.name}</label>
                                <span>{stats[model.playerProperty]}</span> <span>{this.renderDiff(stats[model.playerProperty], opponentStats[model.playerProperty])}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


    renderCharacterInfo() {
        const model = this.props.combatant;
        return (
            <div className="combatant-card-section">
                <div className="combatant-card-section-label">
                    Character
                </div>
                <div>
                    <label>Name</label>
                    <input onChange={::this.handleChange} value={model.name} ref="name"/>
                </div>
                <div>
                    <label>Level</label>
                    <select onChange={::this.handleChange} value={model.level} ref="level">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                                16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(level => {
                                return <option value={level} key={level}>{level}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Class</label>
                    <select onChange={::this.handleChange} value={model.class} ref="class">
                        <option value="ninja">Ninja</option>
                        <option value="monk">Monk</option>
                        <option value="captain">Captain</option>
                    </select>
                </div>
                <div>
                    <label>Skin</label>
                    <select ref="skin" value={model.skin} onChange={::this.handleChange}>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg">svJacob
                        </option>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg">Punky
                        </option>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg">Travis
                        </option>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg">Drew</option>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg">Berg
                        </option>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg">Jessie
                        </option>
                        <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg">Marie
                        </option>
                    </select>
                </div>
            </div>
        )
    }


    render() {
        const model = this.props.combatant;
        return (
            <div className="card combatant-card">
                <div>
                    <div className="combatant-image" style={{backgroundImage: `url(${model.skin})`}}></div>
                </div>
                <div>
                    <div className="combatant-card-section">
                        {this.renderCharacterInfo()}
                    </div>
                    <div className="combatant-card-section _flex-row _flex-row-top">
                        <div className="_c50">
                            {this.renderStatsInfo()}
                        </div>
                        <div className="_c50">
                            {this.renderAlignmentInfo()}
                        </div>
                    </div>
                    <div className="combatant-card-section">
                        <div className="combatant-card-section-label">Laptop Upgrades</div>
                        <CombatantLaptopUpgradeList combatantId={this.props.combatantId}/>
                    </div>
                    <div className="combatant-card-section">
                        <div className="combatant-card-section-label">Character Upgrade</div>
                        <CharacterUpgradeChecklist combatantId={this.props.combatantId}/>
                    </div>
                </div>
            </div >
        );
    }
}


export default CombatantCard;