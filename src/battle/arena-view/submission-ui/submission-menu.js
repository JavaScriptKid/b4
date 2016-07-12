import React from 'react'
import { connect } from 'react-redux'
import { getSubmissionMenuStructure } from './get-submission-menu-structure'
import SubmissionMenuOption from './submission-menu-option'
import PagingIndicators from './paging-indicators'

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
            flex: "1",
            marginTop: 0,
            textAlign: "center",
        };
        
        const containerStyle = {
            width: baseUnit * 37,
        };
        const pageStyle = {
            ...baseOptionStyles,
            width: baseUnit * 8,
            marginLeft: baseUnit * 1.5,
            marginTop: 0
        };

        const backModel = {
            labelText: "MENU",
            customClasses: "back-button",
        };

        const hidePrevPageBtn = this.props.menuOptionIndex <= 4;
        const pageUpModel = {
            labelText: null,
            supportText: null,
            customClasses: hidePrevPageBtn ? "invisible" : ""
        };
        const pageDownModel = {
            labelText: null,
            supportText: null
        };

        

        return (
            <div className="submission-menu_more-container" style={containerStyle}>
                    <SubmissionMenuOption vW={this.props.vW} useBackArrowIcon={true} baseStyle={backStyle} model={backModel} />
                    <SubmissionMenuOption vW={this.props.vW} isLeftArrow={true} baseStyle={pageStyle} model={pageUpModel} />
                    <SubmissionMenuOption vW={this.props.vW} isRightArrow={true} baseStyle={pageStyle} model={pageDownModel} />
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

               <PagingIndicators
                   vW={this.props.vW}
                   totalItems={menuOptions.totalItemCount}
                   currentIndex={this.props.menuOptionIndex}
               />
               {this.renderMoreContainer(menuOptions, optionStyle, baseUnit)}
           </div>
        );
    }
}

export default SubmissionMenu;