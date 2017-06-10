const apiKey = (state = localStorage.getItem('apiKey')
    ? localStorage.getItem('apiKey')
    : '', action) => {
    switch (action.type) {
        case 'CHANGE_API_KEY':
            return action.apiKey
        default:
            return state
    }
}

export default apiKey
