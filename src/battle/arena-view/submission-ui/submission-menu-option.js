import React from 'react';
import { connect } from 'react-redux'

import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'
import Icons from './submission-icons'


@connect((state, props) => {
    return {
        isSelected: (state.battle.selectedOptionId == props.model.optionId)
    }
})

class SubmissionMenuOption extends React.Component {


    handleClick() {
        setBattleValue({
            selectedOptionId: this.props.model.optionId
        });
        setTimeout(()=> {
            this.props.model.handleEnter();
        }, 100)
    }


    renderLeftArrow() {
        const baseUnit = this.props.vW;
        const style = {
            paddingLeft: baseUnit * 1.5,
            paddingRight: baseUnit * 1.5,
        };
        return (
            <span style={style}>{Icons.leftArrow(baseUnit*2)}</span>
        )
    }
    renderRightArrow() {
        const baseUnit = this.props.vW;
        const style = {
            paddingLeft: baseUnit * 1.5,
            paddingRight: baseUnit * 1.5,
        };
        return (
            <span style={style}>{Icons.rightArrow(baseUnit*2)}</span>
        )
    }

    renderBackArrowIcon() {
        const baseUnit = this.props.vW;
        const backArrowStyle = {
            width: 0,
            height: 0,
            position: "relative",
            marginRight: baseUnit * 1.2,
            display: "inline-block",
            top: -baseUnit * 0.2,
            borderTop: `${baseUnit * 0.8}px solid transparent`,
            borderBottom: `${baseUnit * 0.8}px solid transparent`,
            borderRight: `${baseUnit * 1}px solid #000`
        };
        return (
            <span style={backArrowStyle} />
        )
    }

    render() {
        const model = this.props.model;
        const backArrow = this.props.useBackArrowIcon ? this.renderBackArrowIcon() : null;
        const metaStyle = {
            fontSize: this.props.vW * 2
        };

        const style = {
            ...this.props.baseStyle
        };

        const optionClasses = [
            'submission-menu_option',
            model.customClasses || "",
            this.props.isSelected ? "is-selected" : "",
            (this.props.isDeactivated || model.isDeactivated) ? "is-deactivated" : ""
        ].join(' ');

        return (
            <div onClick={::this.handleClick} style={style} className={optionClasses}>
                {model.labelText ? <span>{backArrow}{model.labelText}</span> : null}
                {model.supportText ? <span style={metaStyle}>{model.supportText}</span> : null}
                { this.props.isLeftArrow ? this.renderLeftArrow() : null }
                { this.props.isRightArrow ? this.renderRightArrow() : null }
            </div>
        )
    }
}

export default SubmissionMenuOption;