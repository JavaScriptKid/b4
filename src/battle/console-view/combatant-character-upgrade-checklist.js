import React from 'react'
import { connect } from 'react-redux'
import CharacterUpgrades from '../../_data/_character-upgrades'

@connect((state, props) => {
    return {
        combatant: state.battle.combatants[props.combatantId] || {}
    }
})

class CharacterUpgradeChecklist extends React.Component {

    handleUpgradeChange() {
        console.log('asd')
    }

    render() {
        const upgrades = Object.keys(CharacterUpgrades).map((upgradeId, i) => {
            const model = CharacterUpgrades[upgradeId];

            /* Find my applied Character Upgrades in the list */
            const isChecked = this.props.combatant.characterUpgrades.find( upgrade => {
                return upgrade.libraryId == upgradeId
            });

            return (
                <div key={i}>
                    {model.name}
                    <input onChange={::this.handleUpgradeChange}
                           checked={isChecked} type="checkbox"
                    />
                </div>
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