import React from 'react';
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'

class SubmissionMenuOption extends React.Component {


    handleClick() {
        setBattleValue({
            selectedOptionId: this.props.model.optionId
        });
        this.props.model.handleEnter();
    }


    renderLeftArrow() {
        const baseUnit = this.props.vW;
        const upArrowStyle = {
            width: 0,
            height: 0,
            position: "relative",
            left: baseUnit,
            top: -baseUnit * 0.2,
            borderTop: `${baseUnit * 1.2}px solid transparent`,
            borderBottom: `${baseUnit * 1.2}px solid transparent`,
            borderRight: `${baseUnit * 1.5}px solid #000`
        };
        return (
            <span style={upArrowStyle} />
        )
    }
    renderRightArrow() {
        const baseUnit = this.props.vW;
        const upArrowStyle = {
            width: 0,
            height: 0,
            position: "relative",
            left: baseUnit*1.45,
            top: -baseUnit * 0.2,
            borderTop: `${baseUnit * 1.2}px solid transparent`,
            borderBottom: `${baseUnit * 1.2}px solid transparent`,
            borderLeft: `${baseUnit * 1.5}px solid #000`
        };
        return (
            <span style={upArrowStyle} />
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

        return (
            <div onClick={::this.handleClick} style={this.props.baseStyle} className={`submission-menu_option ${model.customClasses || ""}`}>
                {model.labelText ? <span>{backArrow}{model.labelText}</span> : null}
                {model.supportText ? <span>{model.supportText}</span> : null}
                { this.props.isLeftArrow ? this.renderLeftArrow() : null }
                { this.props.isRightArrow ? this.renderRightArrow() : null }
            </div>
        )
    }
}

export default SubmissionMenuOption;