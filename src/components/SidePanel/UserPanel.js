import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';

class UserPanel extends Component {
   state = {
      user: this.props.currentUser,
      Modal: false
   };

   openModal = () => this.setState({ modal: true });
   closeModal = () => this.setState({ modal: false });



   dropdownOptions = () => [
      {
         key: 'user',
         text:
            <span>
               Signed in as <strong>{this.state.user.displayName}</strong>
            </span>
         ,
         disabled: true
      },
      {
         key: 'avatar',
         text: <span onClick={this.openModal}>Change Avatar</span>
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
      const { user, modal } = this.state;
      const { primaryColor } = this.props;

      return (
         <Grid style={{ background: primaryColor, }}>
            <Grid.Column>
               <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                  {/* MAIN APP HEADER */}
                  <Header inverted floated='left' as="h2">
                     <Icon name="slack" />
                     <Header.Content>Slack</Header.Content>
                  </Header>

                  {/* DROPDOWN */}
                  <Header style={{ padding: '0.25' }} as="h4" inverted>
                     <Dropdown
                        trigger={
                           <span>
                              <Image src={user.photoURL} spaced="right" avatar />
                              {user.displayName}
                           </span>
                        }
                        options={this.dropdownOptions()}
                     >

                     </Dropdown>
                  </Header>
               </Grid.Row>

               {
                  // change user avatar modal
               }
               <Modal basic open={modal} onClose={this.closeModal}>
                  <Modal.Header>
                     Change Avatar
                  </Modal.Header>
                  <Modal.Content>
                     <Input
                        fluid
                        type="file"
                        label='New Avatar'
                        name="previewImage"
                     />
                     <Grid centered stackable columns={2}>
                        <Grid.Row centered>
                           <Grid.Column className="ui center aligned grid">
                              {/* image preview */}

                           </Grid.Column>
                           <Grid.Column className="ui center aligned grid">
                              {/* cropped image preview */}

                           </Grid.Column>
                        </Grid.Row>
                     </Grid>
                  </Modal.Content>
                  <Modal.Actions>
                     <Button color="green" inverted>
                        <Icon name="save"/> Change Avatar
                     </Button>

                     <Button color="green" inverted>
                        <Icon name="image"/> Preview
                     </Button>

                     <Button color="red" inverted  onClick={this.closeModal}>
                        <Icon name="remove"/> Cancel
                     </Button>
                  </Modal.Actions>
               </Modal>
            </Grid.Column>
         </Grid>
      )
   }
}



export default UserPanel
