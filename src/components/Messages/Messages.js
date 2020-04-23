import React from 'react';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';
import ProgressBar from './ProgressBar';




class Messages extends React.Component {
   state = {
      privateChannel: this.props.setPrivateChannel,
      messagesRef: firebase.database().ref('messages'),
      privateMessagesRef: firebase.database().ref('privateMessages'),
      channel: this.props.currentChannel,
      user: this.props.currentUser,

      messages: [],
      messagesLoading: true,
      progressBar: false,
      numUniqueUsers: '',
      searchTerm: '',
      searchLoading: false,
      searchResults: []
   };


   componentDidMount() {
      const { channel, user } = this.state;

      if (channel && user) {
         this.addListeners(channel.id)
      }
   }

   addListeners = channelId => {
      this.addMessageListener(channelId);
   }

   addMessageListener = channelId => {
      let loadedMessages = [];
      const ref = this.getMessagesRef();
      ref.child(channelId).on('child_added', snap => {
         loadedMessages.push(snap.val());
         this.setState({
            messages: loadedMessages,
            messagesLoading: false
         });
         this.countUniqueUsers(loadedMessages);
      })
   };

   getMessagesRef = () => {
      const { messagesRef, privateMessagesRef, privateChannel } = this.state;
      return privateChannel ? privateMessagesRef : messagesRef;
   }

   countUniqueUsers = messages => {
      const uniqueUsers = messages.reduce((acc, message) => {
         if (!acc.includes(message.user.name)) {
            acc.push(message.user.name);
         }
         return acc;
      }, []);

      const numUniqueUsers = `${uniqueUsers.length} user${uniqueUsers.length > 1 ? "s" : ""}`;
      this.setState({ numUniqueUsers });
   }

   displayMessages = messages => (
      messages.length > 0 && messages.map(message => (
         <Message
            key={message.timestamp}
            message={message}
            user={this.state.user}
         />
      ))
   )

   isProgressBarVisible = percent => {
      if (percent > 0) {
         this.setState({
            progressBar: true
         })
      }
   }

   displayChannelName = channel => {
      return channel ? ` ${this.state.privateChannel ? '@' : '#'}${channel.name}` : ''
   }

   handleSearchChange = event => {
      this.setState({
         searchTerm: event.target.value,
         searchLoading: true
      }, () => this.handleSearchMessage()
      );
   }

   handleSearchMessage = ({ searchTerm, messages } = this.state) => {
      const channelMessage = [...messages];

      const regex = new RegExp(searchTerm, 'gi');
      const searchResults = channelMessage.reduce((acc, message) => {
         if (message.content && message.content.match(regex) || message.user.name.match(regex)) {
            acc.push(message);
         }
         return acc;
      }, []);
      this.setState({ searchResults });
      setTimeout(() =>
         this.setState({ searchLoading: false })
         , 1000)

   }



   render() {
      const { messagesRef, messages, channel, user, progressBar, numUniqueUsers, searchTerm, searchResults, searchLoading, privateChannel } = this.state;
      return (
         <React.Fragment>
            <MessagesHeader
               channelName={this.displayChannelName(channel)}
               numUniqueUsers={numUniqueUsers}
               handleSearchChange={this.handleSearchChange}
               searchLoading={searchLoading}
               isPrivateChannel={privateChannel}
            />

            <Segment>
               <Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
                  {
                     searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)
                  }
               </Comment.Group>
            </Segment>

            <MessageForm
               messagesRef={messagesRef}
               currentChannel={channel}
               currentUser={user}
               isProgressBarVisible={this.isProgressBarVisible}
               isPrivateChannel={privateChannel}
               getMessagesRef={this.getMessagesRef}
            />
         </React.Fragment>
      )
   }
}

export default Messages
