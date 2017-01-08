import React, {PropTypes} from 'react';
import ResultsTable from './resultsTable.jsx'

var item_cols = [
    {
        key: 'name',
        label: 'Name'
    }, {
        key: 'count',
        label: 'Count'
    }, {
        key: 'value',
        label: 'Value'
    }
];

const Results = ({walletData, itemData, results, totalItemValue}) => {
    return (
        <div>
            {walletData.items.list
                ? <div>
                        <p>Currency gained/lost</p>
                        <ResultsTable cols={item_cols} data={walletData.items.list}/>
                    </div>
                : null
}
            {itemData.items.data
                ? <div>
                        <p>Items gained/lost</p>
                        <ResultsTable cols={item_cols} data={itemData.items.data.condensed_list2}/></div>
                : null}
            <p>Total Item Value: {totalItemValue}</p>
        </div>

    );

};

Results.propTypes = {
    itemData: PropTypes.object.isRequired,
    walletData: PropTypes.object.isRequired
}

export default Results;
