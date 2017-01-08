const apiKey = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_API_KEY':
      return action.apiKey
    default:
      return state
  }
}

export default apiKey
