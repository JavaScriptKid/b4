import React from 'react'
import { connect } from 'react-redux'
import { getSubmissionMenuStructure } from './get-submission-menu-structure'
import SubmissionMenuOption from './submission-menu-option'
import PagingIndicators from './paging-indicators'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'
import {vW} from '../../../helpers/vw'

@connect((state, props) => {
    return {
        cW: state.map.cW,
        vW: Math.round(state.map.viewportWidth / 100),
        menuLevel: state.battle.menuLevel,
        menuOptionIndex: state.battle.menuOptionIndex,
        showPP: (["attacks", "special"].indexOf(state.battle.menuLevel) > -1)
    }
})

class SubmissionMenu extends React.Component {

    renderMoreContainer(menuOptions, baseOptionStyles, baseUnit) {

        /* Do not show unless on one of these menuLevels: */
        if (["attacks", "special", "items"].indexOf(this.props.menuLevel) == -1) {
            return null
        }

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
            marginTop: 0
        };

        const backModel = {
            labelText: "BACK",
            customClasses: "back-button",
            handleEnter() {
                setBattleValue({
                    menuLevel: ""
                })
            }
        };

        const menuOptionIndex = this.props.menuOptionIndex;
        const hidePrevPageBtn = this.props.menuOptionIndex == 1;
        const pageLeftModel = {
            labelText: null,
            supportText: null,
            customClasses: hidePrevPageBtn ? "invisible" : "",
            handleEnter() {
                setBattleValue({
                    menuOptionIndex: menuOptionIndex - 4
                })
            }
        };

        const isLastPage = menuOptions.totalItemCount <= 4 * this.props.menuOptionIndex;
        const pageRightModel = {
            labelText: null,
            supportText: null,
            customClasses: isLastPage ? "invisible" : "",
            handleEnter() {
                setBattleValue({
                    menuOptionIndex: menuOptionIndex + 4
                })
            }
        };



        return (
            <div className="submission-menu_more-container" style={containerStyle}>
                <div>
                    <SubmissionMenuOption vW={this.props.vW} useBackArrowIcon={false} baseStyle={backStyle} model={backModel} />
                </div>
                <div style={{display:"flex"}}>
                    <SubmissionMenuOption vW={this.props.vW} isLeftArrow={true} baseStyle={pageStyle} model={pageLeftModel} />
                    <SubmissionMenuOption vW={this.props.vW} isRightArrow={true} baseStyle={pageStyle} model={pageRightModel} />
                </div>
            </div>
        )
    }

    render() {
        const baseUnit = this.props.vW;
        const menuStyle = {
            left: (baseUnit * 4),
            bottom: this.props.hide ? (baseUnit * - 43) : (baseUnit * 7),
            fontSize: baseUnit * 3
        };
        const optionStyle = {
            padding: vW(1.2),
            width: vW(37),
            border: `${vW(0.5)}px solid #000`,
            borderRadius: vW(1),
            marginTop: vW(1.5)
        };
        const ppStyle = {
            float: "right",
            fontSize: baseUnit * 2,
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
            return <SubmissionMenuOption vW={baseUnit} baseStyle={optionStyle} key={i} model={optionModel} />
        });

        return (
           <div style={menuStyle} className="submission-menu">
               {this.props.showPP ? <div style={ppStyle}>PP {this.props.casterModel.pp}/{this.props.casterModel.maxPp}</div> : null}
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