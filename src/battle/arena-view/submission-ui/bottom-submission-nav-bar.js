import React from 'react'
import { connect } from 'react-redux'
import SubmissionMenuOption from './submission-menu-option'
import {vW} from '../../../helpers/vw'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'


@connect((state, props) => {
    return {
        //isVisible: (["attacks", "special"].indexOf(state.battle.menuKey) > -1)
        isHidden: state.battle.menuKey == "root",
        menuPageIndex: state.battle.menuPageIndex
    }
})

class BottomSubmissionNavBar extends React.Component {

    render() {
        if (this.props.isHidden) {
            return null;
        }


        const backModel = {
            labelText: "BACK",
            customClasses: "back-button",
            handleEnter() {
                setBattleValue({
                    menuKey: "root",
                    menuPageIndex: 0
                })
            }
        };
        const backStyle = {
            padding: vW(1.2),
            border: `${vW(0.5)}px solid #000`,
            borderRadius: vW(1),

            marginTop: vW(1.3),
            textAlign: "center",
            display:"inline-block"
        };


        const menuPageIndex = this.props.menuPageIndex;
        const prevPage = menuPageIndex > 0 ? menuPageIndex - 1 : 0;
        const nextPage = menuPageIndex < this.props.lastPage ? menuPageIndex + 1 : this.props.lastPage;

        const pageLeftModel = {
            labelText: "[L]",
            customClasses: "",
            handleEnter() {
                setBattleValue({
                    menuPageIndex: prevPage
                })
            }
        };

        const pageRightModel = {
            labelText: "[R]",
            customClasses: "",
            handleEnter() {
                setBattleValue({
                    menuPageIndex: nextPage
                })
            }
        };


        return (
           <div>
               <SubmissionMenuOption vW={this.props.vW} useBackArrowIcon={true} baseStyle={backStyle} model={backModel} />
               <SubmissionMenuOption vW={this.props.vW} baseStyle={backStyle} model={pageLeftModel} />
               <SubmissionMenuOption vW={this.props.vW} baseStyle={backStyle} model={pageRightModel} />
           </div>
        );
    }
}

BottomSubmissionNavBar.propTypes = {
    lastPage: React.PropTypes.number.isRequired
};



export default BottomSubmissionNavBar;