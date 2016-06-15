import React from 'react'
import { connect } from 'react-redux'
import {setCombatantValue} from '../../redux-action-creators/battle-action-creators'
import LaptopUpgrades from '../../_data/_laptop-upgrades'


@connect((state, props) => {
    return {
        combatant: state.battle.combatants[props.combatantId] || {}
    }
})

class CombatantUpgradeList extends React.Component {

    handleRemove(index) {
        setCombatantValue(this.props.combatantId, {
            laptopUpgrades: this.props.combatant.laptopUpgrades.filter((u,i) => {
                return i != index
            })
        })
    }

    handleAdd(id) {
        setCombatantValue(this.props.combatantId, {
            laptopUpgrades: [
                ...this.props.combatant.laptopUpgrades,
                { libraryId: this.refs.adder.value, isEnabled: true }
            ]
        });
        this.refs.adder.value = "";
    }

    render() {
        const upgradeList = this.props.combatant.laptopUpgrades.map((u,i) => {
            return (
                <CombatantUpgrade key={i} handleRemove={::this.handleRemove} listIndex={i} libraryId={u.libraryId} />
            )
        });
        return (
           <div>
               <div>
                   {upgradeList}
               </div>
               <div>
                   <select onChange={::this.handleAdd} ref="adder">
                        <option value="">Add Upgrade...</option>
                        { Object.keys(LaptopUpgrades).map( libraryId => {
                            return (
                                <option value={libraryId} key={libraryId}>
                                    {LaptopUpgrades[libraryId].name}
                                </option>
                            )
                        })}
                   </select>
               </div>
           </div>
        );
    }
}

export default CombatantUpgradeList;

class CombatantUpgrade extends React.Component {

    handleRemove() {
        this.props.handleRemove(this.props.listIndex);
    }

    render() {
        const model = LaptopUpgrades[this.props.libraryId];
        return (
            <div className="_flex-row upgrade-row">
                <div>{model.name}</div>
                <button onClick={::this.handleRemove}>Remove</button>
            </div>
        )
    }
}