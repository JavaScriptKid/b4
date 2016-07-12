import React from 'react';

class SubmissionMenuOption extends React.Component {

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
            left: baseUnit*1.3,
            top: -baseUnit * 0.2,
            borderTop: `${baseUnit * 1.2}px solid transparent`,
            borderBottom: `${baseUnit * 1.2}px solid transparent`,
            borderLeft: `${baseUnit * 1.5}px solid #000`
        };
        return (
            <span style={upArrowStyle} />
        )
    }

    render() {
        const model = this.props.model;
        return (
            <div style={this.props.baseStyle} className={`submission-menu_option ${model.customClasses || ""}`}>
                {model.labelText ? <span>{model.labelText}</span> : null}
                {model.supportText ? <span>{model.supportText}</span> : null}
                { this.props.isUpArrow ? this.renderLeftArrow() : null }
                { this.props.isDownArrow ? this.renderRightArrow() : null }
            </div>
        )
    }
}

export default SubmissionMenuOption;