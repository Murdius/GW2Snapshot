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
var formatValue = function(number) {

    var string = number.toString();

    if (string.length > 5) {
        var index = string.length - 4;
        string = string.slice(0, index) + 'g ' + string.slice(index);
    }
    if (string.length > 3) {
        var index = string.length - 2;
        string = string.slice(0, index) + 's ' + string.slice(index);
    }
    string = string + 'c';
    return string;
}
var getTotalItemValue = function(itemData) {
    var totalItemValue = 0;
    if (itemData.items.item_data) {
        itemData.items.item_data.forEach(function(item) {
            totalItemValue += item['value'];
        });
    }
    return formatValue(totalItemValue)
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
