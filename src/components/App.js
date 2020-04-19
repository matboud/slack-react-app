import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './App.css';


import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetalPanel from './MetalPanel/MetalPanel';

const App = ({currentUser}) => (
   <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <ColorPanel/>
      <SidePanel currentUser={currentUser} />

      <Grid.Column style={{marginLeft: 320}}>
         <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
         <MetalPanel />
      </Grid.Column>

   </Grid>
)

const mapStateToProps = state => ({
   currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
