import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Gw2ArmoryItems from './Gw2ArmoryItems.jsx';

class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var headerComponents = this.generateHeaders();
        var rowComponents = this.generateRows();

        return (
            <div>
                <div>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                {headerComponents}
                            </tr>
                        </thead>
                        <tbody >
                            {rowComponents}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    generateHeaders() {
        var cols = this.props.cols; // [{key, label}]

        // generate our header (th) cell components
        return cols.map(function (colData) {
            return <th className="text-center" key={colData.key}>

                {colData.label}
            </th>;
        });
    }

    generateRows() {
        var cols = this.props.cols; // [{key, label}]
        var self = this;
        return this.props.data.map(function (item) {
            var cells = self.props.cols.map(function (colData) {
                if (colData.key === "name") {
                    if (self.props.type === "wallet") {
                        // colData.key might be "firstName"
                        return <td className="col-md-6 col-xs-6">
                            {item[colData.key]}
                        </td>
                    } else {
                        return <td className="col-md-6 col-xs-6">
                            <Gw2ArmoryItems value={item['id']} />
                        </td>
                    }
                } else {
                    return <td className="col-md-3 col-xs-3">
                        {item[colData.key]}
                    </td>
                }
            });
            return <tr>

                {cells}
            </tr>;
        });
    }
};

export default ResultsTable;
