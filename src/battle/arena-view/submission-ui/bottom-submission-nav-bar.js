import React from 'react'
import { connect } from 'react-redux'
import SubmissionMenuOption from './submission-menu-option'
import {vW} from '../../../helpers/vw'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'


@connect((state, props) => {
    return {
        //isVisible: (["attacks", "special"].indexOf(state.battle.menuKey) > -1)
        isHidden: state.battle.menuKey == "root"
    }
})

class BottomSubmissionNavBar extends React.Component {

    render() {
        if (this.props.isHidden) {
            return null;
        }


        const backModel = {
            labelText: "BACK",
            customClasses: "back-button",
            handleEnter() {
                setBattleValue({
                    menuKey: "root"
                })
            }
        };
        const backStyle = {

                padding: vW(1.2),
                border: `${vW(0.5)}px solid #000`,
                borderRadius: vW(1),

            marginTop: vW(1.3),
            textAlign: "center",
            display:"inline-block"

        };


        return (
           <div>
               <SubmissionMenuOption vW={this.props.vW} useBackArrowIcon={false} baseStyle={backStyle} model={backModel} />
           </div>
        );
    }
}

BottomSubmissionNavBar.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

BottomSubmissionNavBar.defaultProps = {
}



export default BottomSubmissionNavBar;