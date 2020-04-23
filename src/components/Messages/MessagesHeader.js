import React, { Component } from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessagesHeader extends Component {
   render({channelName, numUniqueUsers, handleSearchChange, searchLoading,isPrivateChannel } = this.props) {
      return (
         <Segment clearing>
            {
               // channel title
            }
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
               <span>
                  {channelName}
               {
                  !isPrivateChannel && <Icon name={"star outline"} color="black" />
               }
               </span>
               <Header.Subheader>{numUniqueUsers}</Header.Subheader>
            </Header>

            {
               // channel search input
            }
            <Header floated="right">
               <Input
                  loading={searchLoading}
                  onChange={handleSearchChange}
                  size="mini"
                  icon="search"
                  name="searchTerm"
                  placeholder="Search Messages"
               />
            </Header>
         </Segment>
      )
   }
}

export default MessagesHeader