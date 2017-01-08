export const walletData = (state = {isFetching: false, didInvalidate: false, items: []}, action) => {
  switch (action.type) {
    case 'REQUEST_WALLET_DATA':
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
    })
    case 'RECEIVE_WALLET_DATA':
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.walletData
    })
    case 'INVALIDATE_WALLET_DATA':
    return Object.assign({}, state, {
      didInvalidate: true,
    })
    default:
    return state
  }
}

export default walletData;
