import React from 'react'
import { connect } from 'react-redux'
import CharacterUpgrades from '../../_data/_character-upgrades'
import {setCombatantValue} from '../../redux-action-creators/battle-action-creators'

@connect((state, props) => {
    return {
        //combatant: state.battle.combatants[props.combatantId] || {}
        combatant: state.battle.history[state.battle.devTimeTravelTurn].combatants[props.combatantId] || {},
    }
})

class CharacterUpgradeChecklist extends React.Component {

    render() {
        const upgrades = Object.keys(CharacterUpgrades).map((upgradeId, i) => {
            const model = CharacterUpgrades[upgradeId];

            /* Find my applied Character Upgrades in the list */
            const isChecked = this.props.combatant.characterUpgrades.find( upgrade => {
                return upgrade.libraryId == upgradeId
            });

            return (
                <CharacterUpgradeCheckbox
                    key={i}
                    isChecked={isChecked ? true : false}
                    name={model.name}
                    upgradeId={upgradeId}
                    combatantId={this.props.combatantId}
                    characterUpgrades={this.props.combatant.characterUpgrades}
                />
            )
        });

        return (
            <div>
                {upgrades}
            </div>
        )
    }
}
export default CharacterUpgradeChecklist;


class CharacterUpgradeCheckbox extends React.Component {
    handleUpgradeChange() {
        if (this.props.isChecked) {
            /* Remove one that was checked */
            setCombatantValue( this.props.combatantId, {
                characterUpgrades: this.props.characterUpgrades.filter( u => {
                    return u.libraryId != this.props.upgradeId
                })
            });
            return
        }
        /* Add one that was not checked */
        setCombatantValue( this.props.combatantId, {
            characterUpgrades: [
                ...this.props.characterUpgrades,
                { libraryId: this.props.upgradeId }
            ]
        });
    }
    render() {
        return (
            <div>
                {this.props.name}
                <input ref="checkbox" onChange={::this.handleUpgradeChange}
                       checked={this.props.isChecked} type="checkbox"
                />
            </div>
        )
    }
}