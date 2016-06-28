import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class BattleArenaView extends React.Component {

    render() {
        return (
           <div className="battle-arena">
               Howdy
               <div className="battle-message-box">
                   <p>hello</p>
               </div>
           </div>
        );
    }
}

BattleArenaView.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

BattleArenaView.defaultProps = {
}



export default BattleArenaView;