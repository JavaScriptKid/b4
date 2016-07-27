import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {}
})

class ReportingView extends React.Component {

    render() {

        const matchups = [
            ["a", "a"],
            ["a", "b"],
            ["a", "c"],
            ["b", "b"],
            ["b", "c"],
            ["c", "c"]
        ];

        var columns = [];
        const titleRow = matchups.filter(matchup => {
            if (columns.indexOf(matchup[1]) == -1) {
                columns.push(matchup[1]);
                return true;
            }
            return false;
        }).map((matchup, i) => {
            return (
                <td key={i}>
                    {matchup[1]}
                </td>
            )
        });

        

        return (
            <div>
                <table className="b4-reporting-table">
                    <thead>
                    <tr>
                        <td>X</td>
                        {titleRow}
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default ReportingView;