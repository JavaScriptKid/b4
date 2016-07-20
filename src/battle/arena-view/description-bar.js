import React from 'react'
import { connect } from 'react-redux'

import {convertText} from '../../messaging/text-converter'
import TextLine from './text-line'
import {doStep} from '../do-step'

//DEV ONLY
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import store from '../../init/store'


@connect((state, props) => {
    return {
        vW: Math.round(state.map.viewportWidth / 100),
        descriptionBarText: state.battle.descriptionBarText,
        textMessageContent: state.battle.textMessageContent
    }
})

class DescriptionBar extends React.Component {

    //componentWillUpdate(newProps) {
    //    //if (newProps.textMessageContent.length != this.props.textMessageContent.length) {
    //    //    console.log('update', newProps.textMessageContent)
    //    //}
    //}

    handleEnterKey() {
        doStep();
    }

    getTextLine() {

        if (this.props.textMessageContent.length == 0) {
            return null;
        }

        const textContent = convertText(this.props.textMessageContent);
        return <TextLine content={textContent} needsUserPrompt={true} handleUserPrompt={this.handleEnterKey} />
    }

    render() {
        const baseUnit = this.props.vW;

        const barStyle = {
            padding: this.props.isRollout ? baseUnit * 2 : baseUnit,
            paddingLeft: baseUnit * 3,
            borderTop: `${baseUnit * 0.5}px solid #000`,
            borderBottom: `${baseUnit * 0.5}px solid #000`,
            fontSize: this.props.isRollout ? baseUnit * 2.5 : baseUnit * 2,
            height: this.props.isRollout ? baseUnit * 13 : baseUnit * 5,
        };


        const content = this.props.isRollout
            ? this.getTextLine()
            : this.props.descriptionBarText;
        return (
           <div style={barStyle} className="bottom-bar">
               {content}
           </div>
        );
    }
}

export default DescriptionBar;