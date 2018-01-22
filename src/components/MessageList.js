import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor (props){
  super(props);
  this.state = {
    username: "",
    content: "",
    sentAt: "",
    roomId: "",
    messages: []
  };
  this.messagesRef = this.props.firebase.database().ref('messages');
  this.createMessage = this.createMessage.bind(this);
  this._addMessageContent = this._addMessageContent.bind(this);
  this.deleteMessage = this.deleteMessage.bind(this);


};

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}

_addMessageContent (e) {
  e.preventDefault();
  this.setState(
    {
    content: e.target.value,
    sentAt: firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom,
    username: this.props.currentUser

  })
}

createMessage(e) {
  e.preventDefault();
  this.messagesRef.push(
    {
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId,
      username: this.props.currentUser

    }
  );
   this.setState ({
     message: "",
     sentAt: "",
     roomId: "",
  })
  e.target.reset()
 };

 deleteMessage (messagekey) {
   let currentMessage = this.props.firebase.database().ref('messages/' + messagekey);
   currentMessage.remove();
   console.log('delete clicked')

 }

 render() {

   let activeRoom = this.props.activeRoom

   let currentMessages = (
     this.state.messages.map((message)=> {
       if (message.roomId === activeRoom) {
         return <ol key={message.key}>{message.content}
         <button onClick= { (e) => {this.deleteMessage(message.key)} }>Delete</button>

         </ol>
       }
       return null;
     })
   );

   let messageWindow= (

       <form onSubmit={this.createMessage}>
         <h3>Message Form</h3>
         <textarea type='text' placeholder="Type message here" onChange={this._addMessageContent}/>
         <input type="submit" value="Submit"/>
       </form>

   )
   return (
     <div>
       <div>
          {messageWindow}
      </div>
       <div>
         {currentMessages}
       </div>


     </div>
   );
 }
}


export default MessageList;
