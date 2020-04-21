import React from 'react';

import MessagesHeader from './MessagesHeader';

import MessageForm from './MessageForm';
import {Segment, Comment} from 'semantic-ui-react';


class Messages extends React.Component {
   render() {
      return (
         <React.Fragment>
            <MessagesHeader />
            
            <Segment>
               <Comment.Group className="messages">
             
               </Comment.Group>
            </Segment>

            <MessageForm />
         </React.Fragment>
      )
   }
}

export default Messages
