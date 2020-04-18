import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react'

class UserPanel extends Component {

   dropdownOptions = () => [
      {
         text:
            <span>
               <strong>Matboud</strong>
            </span>
         ,
         disabled: true
      },
      {
         text: <span>Change Avatar</span>
      },
      {
         text: <span onClick={this.handleSignOut}>Sign Out</span>
      }
   ];

   // signOut User
   handleSignOut = () => {
      firebase
         .auth()
         .signOut()
         .then(()=>{
            console.log('signed our!')
         })
   }



   render() {
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
                     <span>Setting</span>
                  } options={this.dropdownOptions()}>

                  </Dropdown>
               </Header>
            </Grid.Column>
         </Grid>
      )
   }
}

export default UserPanel
