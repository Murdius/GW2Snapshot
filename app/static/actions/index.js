export const setVisibilityFilter = (filter) => ({type: 'SET_VISIBILITY_FILTER', filter})

export const requestWalletData = (apiKey) => ({type: 'REQUEST_WALLET_DATA', apiKey: apiKey})

export const receiveWalletData = (apiKey, walletData) => ({type: 'RECEIVE_WALLET_DATA', apiKey, walletData})

export const requestItemData = (apiKey) => ({type: 'REQUEST_ITEM_DATA', apiKey: apiKey})

export const receiveItemData = (apiKey, itemData) => ({type: 'RECEIVE_ITEM_DATA', apiKey, itemData})

export const changeApiKey = (apiKey) => ({type: 'CHANGE_API_KEY', apiKey})

export const changeStatus = (status) => ({type: 'CHANGE_STATUS', status})

export function fetchWalletData(apiKey) {
    return function(dispatch) {
        dispatch(requestWalletData(apiKey))
        return fetch('/wallet', {
            method: "POST",
            credentials: 'include'
        }).then(response => response.json()).then(json => dispatch(receiveWalletData(apiKey, json)))
    }
}

export function fetchItemData(apiKey) {
    return function(dispatch) {
        dispatch(requestItemData(apiKey))
        return fetch('/item', {
            method: "POST",
            credentials: 'include'
        }).then(response => response.json()).then(json => dispatch(receiveItemData(apiKey, json)))
    }
}

export function fetchSnapshot(apiKey) {
    return function(dispatch) {
        dispatch(changeStatus("TAKING FIRST"))
        return fetch('/snapshot', {
            method: "POST",
            credentials: 'include'
        }).then(response => response.json()).then(json => dispatch(changeStatus("TOOK FIRST")))
    }
}

export function takeSnapshot(apiKey) {
    document.cookie = "key=" + apiKey
    return (dispatch, getState) => {
        return dispatch(fetchSnapshot(apiKey))
    }
}

export function retakeSnapshot(apiKey) {
    document.cookie = "key=" + apiKey
    return (dispatch, getState) => {
        return dispatch(fetchItemData(apiKey)).then(() => {
            return dispatch(fetchWalletData(apiKey))
        })
    }
}

export function getItemPriceFromID(id) {
    fetch('https://api.guildwars2.com/v2/commerce/prices/' + id).then(function(response) {
        if (response.ok) {
            response.json().then(function(jsonData) {
                console.log(jsonData)
            });
        } else {
            console.log('Network response was not ok.');
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}

export function getItemNameFromID(id) {
    fetch('https://api.guildwars2.com/v2/items/' + id).then(function(response) {
        if (response.ok) {
            response.json().then(function(jsonData) {
                console.log(jsonData.name);
                return jsonData.name
            });
        } else {
            console.log('Network response was not ok.');
            return 'N/A'
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}
