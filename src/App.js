import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './components/RoomList.js';
import MessageList from './components/MessageList.js';

var config = {
  apiKey: "AIzaSyCL6--NBUm0JYiTh4aXLYGSW6Wt80ParQs",
  authDomain: "bloc-chat-messenger.firebaseapp.com",
  databaseURL: "https://bloc-chat-messenger.firebaseio.com",
  projectId: "bloc-chat-messenger",
  storageBucket: "bloc-chat-messenger.appspot.com",
  messagingSenderId: "332713763369"
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user: ""
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

setActiveRoom(room) {
  this.setState({ activeRoom: room });
}

setUser(user) {
  this.setState({ user: user });
}

  render() {
    let showMessages = this.state.activeRoom;

    return (
      <div>
        <h1>{this.state.activeRoom.name || "Choose a room or Create one"}</h1>
        <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
        { showMessages ?
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}  />
        : null
        }
      </div>
    );
  }
}

export default App;
