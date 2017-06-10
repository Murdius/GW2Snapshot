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
            {walletData.items.wallet_data
                ? <div>
                        <p>Currency gained/lost</p>
                        <ResultsTable cols={item_cols} data={walletData.items.wallet_data}/>
                    </div>
                : null
}
            {itemData.items.item_data
                ? <div>
                        <p>Items gained/lost</p>
                        <ResultsTable cols={item_cols} data={itemData.items.item_data}/></div>
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
