import axios from 'axios'
const serverUrl = 'https://c-ar-d-server.herokuapp.com'

const ALL_USER = 'ALL_USER'

const getAllUsers = user => ({
  type: ALL_USER,
  user
})

export const fetchAllUsers = () => async dispatch => {
  try {
    const res = await axios.get(`${serverUrl}/api/users`)
    dispatch(getAllUsers(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function (user = {}, action) {
  switch (action.type) {

    case ALL_USER:
      return action.user

    default:
      return user
  }
}
