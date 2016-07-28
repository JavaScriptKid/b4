import React from 'react'
import { connect } from 'react-redux'
import Table from './table.js'
import {modelsFromObject} from '../../helpers/models-from-object'
import Combatants, {getGeneratedCharacters} from '../../_data/reporting-combatants'
import calculateRows from './calculate-row'




@connect((state, props) => {
    return {}
})

class ReportingView extends React.Component {

    constructor() {
        super();

        this.GeneratedCombatants = getGeneratedCharacters();

        this.state = {
            columns: modelsFromObject(this.GeneratedCombatants),
            rowData: {}
        }
    }

    handleRunReportButton() {

        this.setState({
            rowData: {}
        }, () => {
            const participantIds = Object.keys(this.GeneratedCombatants);
            calculateRows(participantIds, this.handleNewMatchupResult.bind(this), this.GeneratedCombatants)
        });
    }



    handleNewMatchupResult(newResult) {

        let rowData = {...this.state.rowData};

        const firstWins = (newResult.firstCombatantId == newResult.secondCombatantId) ?
            "X" : newResult.firstCombatantWins;

        const secondWins = (newResult.firstCombatantId == newResult.secondCombatantId) ?
            "X" : newResult.secondCombatantWins;

        rowData[
            `${newResult.firstCombatantId}_x_${newResult.secondCombatantId}`] = firstWins;
        rowData[`${newResult.secondCombatantId}_x_${newResult.firstCombatantId}`] = secondWins;

        this.setState({
            rowData: rowData
        })
    }


    render() {
        return (
            <div>
                <button onClick={::this.handleRunReportButton}>Run Report</button>
                <Table columns={this.state.columns} rowData={this.state.rowData}/>
            </div>
        );
    }
}

export default ReportingView;