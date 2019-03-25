import axios from 'axios'
const serverUrl = 'https://c-ar-d-server.herokuapp.com'

const initialState = {
  card: {}
}
//ACTION TYPES
const SET_SELECTED_CARD = 'SET_SELECTED_CARD'
const GET_SELECTED_CARD = 'GET_SELECTED_CARD'

//ACTION CREATORS
export const setSelectedCard = card => ({
  type: SET_SELECTED_CARD,
  card
})

export const getSelectedCard = () => ({
  type: GET_SELECTED_CARD,
}) // please correct if wrong!

//THUNK
export const fetchSelectedCard = (uuid) => async dispatch => {
  try {
    // const {data} = await axios.get(`${serverUrl}/api/cards/${uuid}`)
    //replace once card route is updated to reflect server instead of local host
    const {data} = await axios.get(`http://localhost:8080/api/cards/${uuid}`)
    dispatch(setSelectedCard(data))
  } catch (error) {
    console.error(error)
  }
}

export default function (card = {}, action) {
  switch (action.type) {

    case SET_SELECTED_CARD:
      return {card: action.card}
    case GET_SELECTED_CARD:
     return action.card // please correct if wrong
    default:
      return card
  }
}
