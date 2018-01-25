import axios from 'axios'

const GET_ROOM = 'GET_ROOM'

const getRoom = room => ({type: GET_ROOM, room})

let initialRoom = {}

export const fetchRoom = () =>
  dispatch =>
    axios.get('/api/room/:id')
      .then(res => {
        dispatch(getRoom(res.data))
      })
      .catch(err => console.error(err))

export default function (state = initialRoom, action) {
  switch (action.type) {
    case GET_ROOM:
      return action.room
    default:
      return state
  }
}
