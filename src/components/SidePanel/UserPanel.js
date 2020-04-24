import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';
import AvatarEditor from 'react-avatar-editor';

class UserPanel extends Component {
   state = {
      user: this.props.currentUser,
      Modal: false,
      previewImage: '',
      croppedImage: '',
      blob: ''
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

   handleChange = event => {
      const file = event.target.files[0];
      const reader = new FileReader();

      if (file) {
         reader.readAsDataURL(file);
         reader.addEventListener('load', () => {
            this.setState({ previewImage: reader.result });
         })
      }
   }

   handleCropImage = () => {
      if (this.avatarEditor) {
         this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
               croppedImage: imageUrl,
               blob
            })
         })
      }
   }

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
      const { user, modal, previewImage, croppedImage, blob } = this.state;
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
                        onChange={this.handleChange}
                     />
                     <Grid centered stackable columns={2}>
                        <Grid.Row centered>
                           <Grid.Column className="ui center aligned grid">
                              {/* image preview */}
                              {
                                 previewImage && (
                                    <AvatarEditor
                                       ref={node => (this.avatarEditor = node)}
                                       image={previewImage}
                                       width={120}
                                       height={120}
                                       border={50}
                                       scale={1.2}
                                    />
                                 )
                              }
                           </Grid.Column>

                           <Grid.Column className="ui center aligned grid">
                              {/* cropped image preview */}
                              {croppedImage && (
                                 <Image
                                    style={{ margin: '3.5em auto' }}
                                    width={100}
                                    height={100}
                                    src={croppedImage}
                                 />
                              )}
                           </Grid.Column>

                        </Grid.Row>
                     </Grid>
                  </Modal.Content>
                  <Modal.Actions>
                     {
                        croppedImage && <Button color="green" inverted>
                           <Icon name="save" /> Change Avatar
                        </Button>
                     }

                     <Button color="green" inverted onClick={this.handleCropImage}>
                        <Icon name="image" /> Preview
                     </Button>

                     <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                     </Button>
                  </Modal.Actions>
               </Modal>
            </Grid.Column>
         </Grid>
      )
   }
}



export default UserPanel
