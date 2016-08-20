import React from 'react'
import { connect } from 'react-redux'

import initBattleCombatants from '../../battle/init-battle-combatants'
import Combatants from '../../_data/reporting-combatants'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'


@connect((state, props) => {
    return {
        isActive: state.battle.showEndingOverlay,
        cW: state.map.cW || 1
    }
})

class EndingOverlay extends React.Component {


    handleClick(e) {
        e.preventDefault();

        //Seed the battle - B4 demo only!
        initBattleCombatants(
            Combatants["player"],
            Combatants["meatsim"]
        );

        /* Reset the option menus to be happy on reload */
        setBattleValue({
            selectedOptionId: "root_attack",
            menuKey: "root",
            menuPageIndex: 0,
        })
    }


    render() {

        const activeClass = this.props.isActive ? "is-active" : "";
        const linkStyle = {
            fontSize: Math.round( this.props.cW*3 )
        };


        return (
           <div className={`ending-overlay ${activeClass}`}>
                <a href="#" onClick={::this.handleClick} className="ending-overlay-link" style={linkStyle} >
                    Restart?
                </a>
           </div>
        );
    }
}



export default EndingOverlay;