import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';

class UserPanel extends Component {
   state = {
      user: this.props.currentUser,
   }
   
   dropdownOptions = () => [
      {
         key: 'user',
         text:
            <span>
               <strong>{this.state.user.displayName}</strong>
            </span>
         ,
         disabled: true
      },
      {
         key: 'avatar',
         text: <span>Change Avatar</span>
      },
      {
         key: 'signOut',
         text: <span onClick={this.handleSignOut}>Sign Out</span>
      }
   ];

   // signOut User
   handleSignOut = () => {
      firebase
         .auth()
         .signOut()
         .then(() => {
            console.log('signed our!')
         })
   }



   render() {
      console.log(this.props.currentUser);
      return (
         <Grid style={{ background: '#611f69', }}>
            <Grid.Column>
               <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                  {/* MAIN APP HEADER */}
                  <Header inverted floated='left' as="h2">
                     <Icon name="slack" />
                     <Header.Content>Slack</Header.Content>
                  </Header>
               </Grid.Row>


               {/* DROPDOWN */}
               <Header style={{ padding: '0.25' }} as="h4" inverted>
                  <Dropdown trigger={
                     <span>{this.state.user.displayName}</span>
                  } options={this.dropdownOptions()}>

                  </Dropdown>
               </Header>
            </Grid.Column>
         </Grid>
      )
   }
}



export default UserPanel
