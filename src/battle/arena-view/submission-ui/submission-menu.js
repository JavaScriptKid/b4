import React from 'react'
import { connect } from 'react-redux'
import { getSubmissionMenuStructure } from './get-submission-menu-structure'
import SubmissionMenuOption from './submission-menu-option'

@connect((state, props) => {
    return {
        vW: Math.round(state.map.viewportWidth / 100),
        menuLevel: state.battle.menuLevel,
        menuOptionIndex: state.battle.menuOptionIndex
    }
})

class SubmissionMenu extends React.Component {

    renderMoreContainer(menuOptions, baseOptionStyles, baseUnit) {

        const backStyle = {
            ...baseOptionStyles,
            width: 'initial',
            flex: "1"
        };
        
        const containerStyle = {
            width: baseUnit * 37
        };
        const pageStyle = {
            ...baseOptionStyles,
            width: baseUnit * 8,
            marginLeft: baseUnit * 1.5
        };

        const backModel = {
            labelText: "Back",
            customClasses: "back-button",
        };
        const pageUpModel = {
            labelText: null,
            supportText: null
        };
        const pageDownModel = {
            labelText: null,
            supportText: null
        };

        return (
            <div className="submission-menu_more-container" style={containerStyle}>
                    <SubmissionMenuOption vW={this.props.vW} baseStyle={backStyle} model={backModel} />
                    <SubmissionMenuOption vW={this.props.vW} isUpArrow={true} baseStyle={pageStyle} model={pageUpModel} />
                    <SubmissionMenuOption vW={this.props.vW} isDownArrow={true} baseStyle={pageStyle} model={pageDownModel} />
            </div>
        )
    }

    render() {
        const baseUnit = this.props.vW;
        const menuStyle = {
            left: (baseUnit * 4),
            bottom: this.props.hide ? (baseUnit * - 39):(baseUnit * 7),
            fontSize: baseUnit * 3
        };
        const optionStyle = {
            padding: baseUnit * 1.5,
            width: baseUnit * 37,
            border: `${baseUnit * 0.5 }px solid #000`,
            borderRadius: `${baseUnit * 0.5 }`,
            marginTop: baseUnit * 1.5
        };


        const menuOptions = getSubmissionMenuStructure(
            this.props.casterModel,
            this.props.menuLevel,
            this.props.menuOptionIndex
        );

        const optionComponents = menuOptions.items.map((optionModel, i) => {
            return <SubmissionMenuOption baseStyle={optionStyle} key={i} model={optionModel} />
        });

        return (
           <div style={menuStyle} className="submission-menu">
               {optionComponents}
               {this.renderMoreContainer(menuOptions, optionStyle, baseUnit)}
           </div>
        );
    }
}

export default SubmissionMenu;