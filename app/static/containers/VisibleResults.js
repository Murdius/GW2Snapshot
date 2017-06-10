import {connect} from 'react-redux'
import {toggleresult, getItemNameFromID} from '../actions'
import Results from '../components/results.jsx'

const getVisibleResults = (results, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return results
        case 'SHOW_NONZERO':
            return results
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

var getItemValue = function(itemData) {
    if (itemData.items.item_data) {
        itemData.items.item_data.forEach(function(item) {
            item['value'] = item['unit_price'] * item['count'];
        });
    }
    return itemData;
}

var getTotalItemValue = function(itemData) {
    var totalItemValue = 0;
    if (itemData.items.item_data) {
        itemData.items.item_data.forEach(function(item) {
            totalItemValue += item['value'];
        });
    }
    return totalItemValue
}
const mapStateToProps = (state) => ({
    results: getVisibleResults(state.results, state.visibilityFilter),
    itemData: getItemValue(state.itemData),
    walletData: state.walletData,
    totalItemValue: getTotalItemValue(state.itemData)
})

const mapDispatchToProps = ({})

const VisibleResults = connect(mapStateToProps, mapDispatchToProps)(Results)

export default VisibleResults
