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
            //flex: "1",
            marginTop: 0,
            textAlign: "center",
            display:"block"
        };
        
        const containerStyle = {
            width: baseUnit * 37,
            display: "flex",
            justifyContent: "space-between"
        };
        const pageStyle = {
            ...baseOptionStyles,
            width: baseUnit * 8,
            marginLeft: baseUnit * 1.5,
            marginTop: 0,

        };

        const backModel = {
            labelText: "BACK",
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
                <div>
                    <SubmissionMenuOption vW={this.props.vW} useBackArrowIcon={false} baseStyle={backStyle} model={backModel} />
                </div>
                <div style={{display:"flex"}}>
                    <SubmissionMenuOption vW={this.props.vW} isLeftArrow={true} baseStyle={pageStyle} model={pageUpModel} />
                    <SubmissionMenuOption vW={this.props.vW} isRightArrow={true} baseStyle={pageStyle} model={pageDownModel} />
                </div>
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
            padding: baseUnit * 1.2,
            width: baseUnit * 37,
            border: `${baseUnit * 0.5 }px solid #000`,
            borderRadius: `${baseUnit * 0.5 }`,
            marginTop: baseUnit * 1.5
        };
        const ppStyle = {
            float: "right",
            fontSize: baseUnit * 2,
            //marginBottom: baseUnit * 1,
            borderRadius: baseUnit * 0.3,
            position: "relative",
            borderBottomRightRadius: 0,
            top: 2,
            background: "#000",
            color: "#fff",
            padding: `${baseUnit * 0.5}px ${baseUnit}px`
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
               <div style={ppStyle}>PP {this.props.casterModel.pp}/{this.props.casterModel.maxPp}</div>
               <div>
                {optionComponents}
               </div>

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