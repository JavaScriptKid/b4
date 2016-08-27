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


    handleEnterKey() {
        doStep();
    }

    getTextLine() {

        if (this.props.textMessageContent.length == 0) {
            return null;
        }

        const textContent = convertText(this.props.textMessageContent);
        return <TextLine vW={this.props.vW} content={textContent} needsUserPrompt={true} handleUserPrompt={this.handleEnterKey} />
    }

    getContent() {
        if (this.props.isIntro) {
            const challengerName = this.props.challengerModel.name;
            const challengeeName = this.props.challengeeModel.name;
            const textContent = convertText([`[FAST]${challengerName} challenges ${challengeeName} to a HACK BATTLE!`]);
            return <TextLine vW={this.props.vW} content={textContent} needsUserPrompt={true} handleUserPrompt={this.handleEnterKey} />
        }

        if (this.props.isRollout) {
            return this.getTextLine();
        }

        return this.props.descriptionBarText;
    }

    render() {
        const baseUnit = this.props.vW;
        const isBig = (this.props.isRollout || this.props.isIntro);


        const barStyle = {
            padding: isBig ? baseUnit * 2 : baseUnit,
            paddingLeft: baseUnit * 3,
            borderTop: `${baseUnit * 0.5}px solid #000`,
            borderBottom: `${baseUnit * 0.5}px solid #000`,
            fontSize: isBig ? baseUnit * 2.5 : baseUnit * 2,
            height: isBig ? baseUnit * 13 : baseUnit * 5,
        };



        const content = this.getContent();

        return (
           <div style={barStyle} className="bottom-bar">
               {content}
           </div>
        );
    }
}

export default DescriptionBar;