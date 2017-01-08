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

var getItemNames = function(itemData) {
    if (itemData.items.data) {
        itemData.items.data.condensed_list2.forEach(function(item) {
            fetch('https://api.guildwars2.com/v2/items/' + item['id']).then(function(response) {
                if (response.ok) {
                    response.json().then(function(jsonData) {
                        item['name'] = jsonData.name
                    });
                } else {
                    console.log('Network response was not ok.');
                    return 'N/A'
                }
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
        });
    }
    return itemData
}

var getItemPrices = function(itemData) {
    if (itemData.items.data) {
        itemData.items.data.condensed_list2.forEach(function(item) {
            fetch('https://api.guildwars2.com/v2/commerce/prices/' + item['id']).then(function(response) {
                if (response.ok) {
                    response.json().then(function(jsonData) {
                        item['unit_price'] = jsonData.sells.unit_price;
                    });
                } else {
                    console.log('Network response was not ok.');
                }
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
        });
    }
    return itemData
}

var getItemValue = function(itemData) {
    if (itemData.items.data) {
        itemData.items.data.condensed_list2.forEach(function(item) {
            item['value'] = item['unit_price'] * item['count'];
        });
    }
    return itemData;
}

var getItemPricesAndNames = function(itemData) {
    itemData = getItemPrices(itemData);
    itemData = getItemNames(itemData);
    itemData = getItemValue(itemData);
    return itemData;
}
var getTotalItemValue = function(itemData) {
    var totalItemValue = 0;
    if (itemData.items.data) {
        itemData.items.data.condensed_list2.forEach(function(item) {
            if (!isNaN(item['value'])) {
                totalItemValue += item['value'];
            }
        });
    }
    return totalItemValue
}
const mapStateToProps = (state) => ({
    results: getVisibleResults(state.results, state.visibilityFilter),
    itemData: getItemPricesAndNames(state.itemData),
    walletData: state.walletData,
    totalItemValue: getTotalItemValue(state.itemData)
})

const mapDispatchToProps = ({})

const VisibleResults = connect(mapStateToProps, mapDispatchToProps)(Results)

export default VisibleResults
