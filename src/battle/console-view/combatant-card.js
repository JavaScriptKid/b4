import React from 'react'
import { connect } from 'react-redux'
import {setCombatantValue} from '../../redux-action-creators/battle-action-creators'


@connect((state, props) => {
    return {
        combatant: state.battle.combatants[props.combatantId] || {}
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


    renderStatsInfo() {
        return (
            <div>
                <div>Stats</div>
                <div>
                    <label>HP</label>
                    <span>?</span>
                </div>
                <div>
                    <label>PP</label>
                    <span>?</span>
                </div>
                <div>
                    <label>Atk</label>
                    <span>?</span>
                </div>
                <div>
                    <label>Def</label>
                    <span>?</span>
                </div>
                <div>
                    <label>Spec</label>
                    <span>?</span>
                </div>
                <div>
                    <label>Spd</label>
                    <span>?</span>
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
                    <div>Character</div>
                    <div>
                        <label>Name</label>
                        <input onChange={::this.handleChange} value={model.name} ref="name" />
                    </div>
                    <div>
                        <label>Level</label>
                        <select onChange={::this.handleChange} ref="level">
                            {
                                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(level => {
                                    return <option value={level} key={level}>{level}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Class</label>
                        <select onChange={::this.handleChange} value={model.class} ref="class">
                            <option>Ninja</option>
                            <option>Monk</option>
                            <option>Captain</option>
                        </select>
                    </div>
                    <div>
                        <label>Skin</label>
                        <select ref="skin" value={model.skin} onChange={::this.handleChange}>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg">svJacob</option>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg">Punky</option>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-pink.svg">Travis</option>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg">Drew</option>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg">Berg</option>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg">Jessie</option>
                            <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg">Marie</option>
                        </select>
                    </div>
                    {this.renderStatsInfo()}
                </div>
            </div>
        );
    }
}


export default CombatantCard;