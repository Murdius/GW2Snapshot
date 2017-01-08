const itemData = (state = {isFetching: false, didInvalidate: false, items: []}, action) => {
  switch (action.type) {
    case 'REQUEST_ITEM_DATA':
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
    })
    case 'RECEIVE_ITEM_DATA':
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.itemData
    })
    case 'INVALIDATE_ITEM_DATA':
    return Object.assign({}, state, {
      didInvalidate: true,
    })
    default:
    return state
  }
}

export default itemData
