import React, {Component} from 'react';
import {connect} from 'react-redux'
import {room} from '../store'

class Room extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    console.log("HI HI HI")
    return (
      <div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    email: state.user.email,
    songs: state.songs,
    current: state.current
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRoom: () => {
      dispatch(fetchRoom)
    }
  }
}

export default connect(mapState, mapDispatch)(Room)
