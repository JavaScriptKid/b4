import React from 'react';
import Cell from "./Cell.js"


class Table extends React.Component {

    render() {

        const rows = this.props.columns.map((colModel, i) => {
            return (
                <tr key={i}>
                    <td>{colModel.name}</td>
                    {
                        this.props.columns.map((rowModel, i2) => {

                            const key = `${colModel._id}_x_${rowModel._id}`;
                            const content = this.props.rowData[key];

                            return <Cell key={i2} content={content}/>

                        })
                    }
                </tr>
            )
        });


        return (
            <table className="b4-reporting-table">
                <thead>
                <tr>
                    <td></td>
                    {
                        this.props.columns.map(model => {
                            return <td key={model._id}>{model.name}</td>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
}

export default Table;