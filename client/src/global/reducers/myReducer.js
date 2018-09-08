const initialMy = null

export default (state = initialMy, action) => {
  if (action.type === 'MY_ACTION') {
    localStorage.setItem('userAutchData', JSON.stringify(action.payload))
    return action.payload
  }
  return state
}
