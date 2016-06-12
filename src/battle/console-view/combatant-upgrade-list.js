import React from 'react'
import { connect } from 'react-redux'
import {setCombatantValue} from '../../redux-action-creators/battle-action-creators'


@connect((state, props) => {
    return {
        combatant: state.battle.combatants[props.combatantId] || {}
    }
})

class CombatantUpgradeList extends React.Component {

    handleRemove(index) {
        setCombatantValue(this.props.combatantId, {
            upgrades: this.props.combatant.upgrades.filter((u,i) => {
                return i != index
            })
        })
    }

    render() {
        const upgradeList = this.props.combatant.upgrades.map((u,i) => {
            return (
                <CombatantUpgrade key={i} handleRemove={::this.handleRemove} listIndex={i} libraryId={u.libraryId} />
            )
        });
        return (
           <div>
               <div>Upgrades</div>
               <div>
                   {upgradeList}
               </div>
           </div>
        );
    }
}

export default CombatantUpgradeList;

import LaptopUpgrades from '../../_data/_laptop-upgrades'
class CombatantUpgrade extends React.Component {

    handleRemove() {
        this.props.handleRemove(this.props.listIndex);
    }

    render() {
        const model = LaptopUpgrades[this.props.libraryId];
        return (
            <div>
                <span>{model.name}</span>
                <button onClick={::this.handleRemove}>Remove</button>
            </div>
        )
    }
}