import React from 'react'
import { connect } from 'react-redux'
import {vW} from '../../../helpers/vw'

@connect((state, props) => {
    return {
        cW: state.map.cW,
        menuKey: state.battle.menuKey
    }
})

class SubmissionTitleBar extends React.Component {


    renderTitleText() {

        if (this.props.menuKey == "attack") {
            return "ATTACK"
        }
        if (this.props.menuKey == "special") {
            return "SPECIAL"
        }
        if (this.props.menuKey == "items") {
            return "ITEM"
        }
        if (this.props.menuKey == "superCharge") {
            return "SUPER CHARGE"
        }

        return "CHOOSE OPTION"
    }

    render() {

        const titleStyle = {
            float: "left",
            fontSize: vW(2.5),
            padding: `${vW(0)}px ${vW(1)}px`
        };
        const ppStyle = {
            float: "right",
            fontSize: vW(2),
            borderRadius: vW(0.3),
            position: "relative",
            borderBottomRightRadius: 0,
            top: vW(0.4),
            background: "#000",
            color: "#fff",
            padding: `${vW(0.5)}px ${vW(1)}px`
        };

        return (
            <div>
                <div style={titleStyle}>{this.renderTitleText()}</div>
                <div style={ppStyle}>PP {this.props.pp}/{this.props.maxPp}</div>
            </div>
        );
    }
}

SubmissionTitleBar.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

export default SubmissionTitleBar;