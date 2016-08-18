import React from 'react'
import { connect } from 'react-redux'

//New way!
import {getMenuModel} from './get-menu-model'
import {getPagesFromArray} from '../../../helpers/array-to-pages'
import {updateDescriptionText} from './update-description-text'


import SubmissionMenuOption from './submission-menu-option'
import SubmissionTitleBar from './submission-title-bar'
import BottomSubmissionNavBar from './bottom-submission-nav-bar'


import PagingIndicators from './paging-indicators'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'
import {vW} from '../../../helpers/vw'

//Keyboard
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../../helpers/single-keypress-binding'
import {
    handleMenuUp, handleMenuDown,
    handleMenuLeft, handleMenuRight,
    handleMenuEnter
} from './menu-keyboard-handlers'

@connect((state, props) => {
    return {
        cW: state.map.cW,
        vW: Math.round(state.map.viewportWidth / 100),

        menuKey: state.battle.menuKey,
        menuPageIndex: state.battle.menuPageIndex,

        selectedOptionId: state.battle.selectedOptionId
    }
})

class SubmissionMenu extends React.Component {




    bindKeyboard() {
        addKeyboardSinglePress(38, handleMenuUp.bind(this, this.menuModel), "battle-submission-ui-handle-up");
        addKeyboardSinglePress(40, handleMenuDown.bind(this, this.menuModel), "battle-submission-ui-handle-down");
        addKeyboardSinglePress(37, handleMenuLeft.bind(this, this.menuModel), "battle-submission-ui-handle-left");
        addKeyboardSinglePress(39, handleMenuRight.bind(this, this.menuModel), "battle-submission-ui-handle-right");
        addKeyboardSinglePress(13, handleMenuEnter.bind(this, this.menuModel), "battle-submission-ui-handle-enter");

    }
    unbindKeyboard() {
        //console.log('UNBIND');
        removeKeyboardSinglePress("battle-submission-ui-handle-up");
        removeKeyboardSinglePress("battle-submission-ui-handle-down");
        removeKeyboardSinglePress("battle-submission-ui-handle-left");
        removeKeyboardSinglePress("battle-submission-ui-handle-right");
        removeKeyboardSinglePress("battle-submission-ui-handle-enter");
    }

    componentWillMount() {
        this.menuModel = getMenuModel(this.props.casterModel).structure;
        updateDescriptionText(this.props.selectedOptionId, this.menuModel);
    }

    componentDidMount() {
        this.bindKeyboard();
    }

    componentWillUpdate(newProps) {
        if (!newProps.hide && this.props.hide) {
            //NOW SHOWING
            this.menuModel = getMenuModel(newProps.casterModel).structure; //Update the menu model

            this.bindKeyboard();
        }
        if (newProps.hide && !this.props.hide) {
            //NO LONGER SHOWING
            this.unbindKeyboard();
        }

        if (newProps.selectedOptionId != this.props.selectedOptionId) {
            updateDescriptionText(newProps.selectedOptionId, this.menuModel);
        }

    }

    render() {
        const baseUnit = this.props.vW;
        const menuStyle = {
            width: baseUnit * 37,
            left: (baseUnit * 2),
            bottom: this.props.hide ? (baseUnit * - 43) : (baseUnit * 7),
            fontSize: baseUnit * 3
        };
        const optionStyle = {
            padding: vW(1.2),
            // width: vW(37),
            width: "100%",
            border: `${vW(0.5)}px solid #000`,
            borderRadius: vW(1),
            marginTop: vW(1)
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


        //const menu = getMenuModel(this.props.casterModel).structure;
        //console.log(menu)
        const pages = getPagesFromArray( this.menuModel[this.props.menuKey] );

        const optionComponents = pages[this.props.menuPageIndex].map((optionModel, i) => {
            return <SubmissionMenuOption vW={baseUnit} baseStyle={optionStyle} key={i} model={optionModel} />
        });

        return (
           <div style={menuStyle} className="submission-menu">
               {this.props.showPP ? <div style={ppStyle}>PP {this.props.casterModel.pp}/{this.props.casterModel.maxPp}</div> : null}

               <SubmissionTitleBar pp={this.props.casterModel.pp} maxPp={this.props.casterModel.maxPp}  />

               <div>
                {optionComponents}
               </div>

               <PagingIndicators
                   vW={this.props.vW}
                   totalItems={pages.length}
                   currentIndex={this.props.menuPageIndex}
               />

               <BottomSubmissionNavBar menuModel={this.menuModel} vW={this.props.vW} lastPage={pages.length-1} />
           </div>
        );
    }
}

export default SubmissionMenu;