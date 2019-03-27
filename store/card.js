import axios from 'axios'

// ACTION TYPES
const GET_SCANNED_CARD = 'GET_SCANNED_CARD'

// ACTION CREATORS
const gotScannedCard = card => ({
  type: GET_SCANNED_CARD,
  card
})

// THUNK CREATORS
export const fetchScannedCard = cardURL => async dispatch => {
  try {
    const card = await axios.get(cardURL)
    dispatch(gotScannedCard(card.data))

  } catch (error) {
    console.error(error)
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case
    GET_SCANNED_CARD:
      return action.card
    default:
      return state
  }
}
