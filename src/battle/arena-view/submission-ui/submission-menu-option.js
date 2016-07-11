import React from 'react';

class SubmissionMenuOption extends React.Component {
    render() {
        const model = this.props.model;
        return (
            <div style={this.props.baseStyle} className="submission-menu_option">
                <span>{model.labelText}</span>
                <span>...</span>
            </div>
        )
    }
}

export default SubmissionMenuOption;