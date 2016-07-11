import React from 'react'
import { connect } from 'react-redux'
import { getSubmissionMenuStructure } from './get-submission-menu-structure'
import SubmissionMenuOption from './submission-menu-option'

@connect((state, props) => {
    return {
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class SubmissionMenu extends React.Component {

    render() {
        const baseUnit = this.props.vW;
        const menuStyle = {
            left: (baseUnit * 4),
            bottom: this.props.hide ? (baseUnit * - 24):(baseUnit * 7),
            fontSize: baseUnit * 3
        };
        const optionStyle = {
            padding: baseUnit * 1.5,
            width: baseUnit * 31,
            border: `${baseUnit * 0.5 }px solid #000`,
            borderRadius: `${baseUnit * 0.5 }`,
            marginTop: baseUnit * 1.5
        };


        const menuOptions = getSubmissionMenuStructure(this.props.casterModel);
        const optionComponents = menuOptions.map((optionModel, i) => {
            return <SubmissionMenuOption baseStyle={optionStyle} key={i} model={optionModel} />
        });

        return (
           <div style={menuStyle} className="submission-menu">
               {optionComponents}
           </div>
        );
    }
}

export default SubmissionMenu;