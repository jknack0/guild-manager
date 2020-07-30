import userService from '../services/user'

const userReducer = (state = {}, action) => {
  switch(action.type) {
  case 'CREATE_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer

export const registerUser = (userObject) => {
  return async dispatch => {
    const registeredUser = await userService.createUser(userObject)
    dispatch({
      type: 'CREATE_USER',
      data: registeredUser
    })
  }
}