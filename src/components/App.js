import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './App.css';


import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetalPanel from './MetalPanel/MetalPanel';

const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => (
   <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
      <ColorPanel
         key={currentUser && currentUser.name}
         currentUser={currentUser}
      />

      <SidePanel
         key={currentUser && currentUser.uid}
         currentUser={currentUser}
         primaryColor={primaryColor}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
         <Messages
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
            isPrivateChannel={isPrivateChannel}
         />
      </Grid.Column>

      <Grid.Column width={4}>
         <MetalPanel
            key={currentChannel && currentChannel.name}
            currentChannel={currentChannel}
            isPrivateChannel={isPrivateChannel}
            userPosts={userPosts}
         />
      </Grid.Column>

   </Grid>
)

const mapStateToProps = state => ({
   currentUser: state.user.currentUser,
   currentChannel: state.channel.currentChannel,
   isPrivateChannel: state.channel.isPrivateChannel,
   userPosts: state.channel.userPosts,
   primaryColor: state.colors.primaryColor,
   secondaryColor: state.colors.secondaryColor
})

export default connect(mapStateToProps)(App);
