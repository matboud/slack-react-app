import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';

class Channels extends Component {
   state = {
      currentUser: this.props.currentUser,
      channels: [],
      modal: false,
      channelName: '',
      channelDetails: '',
      channelRef: firebase.database().ref('channels'),
   }


   handleSubmit = event => {
      event.preventDefault();
      if (this.isFormValid(this.state)) {
         this.addChannel(this.state);
      }
   }

   addChannel = ({ channelName, channelDetails, channelRef, currentUser }) => {
      const key = channelRef.push().key;

      const newChannel = {
         id: key,
         name: channelName,
         details: channelDetails,
         createdBy: {
            name: currentUser.displayName,
            avatar: currentUser.photoURL
         }
      };

      channelRef
         .child(key)
         .update(newChannel)
         .then(() => {
            this.setState({
               channelName: '',
               channelDetails: ''
            });
            this.closeModal();
            console.log('channel added successfuly')
         })
         .catch(err => {
            console.log(err)
         })


   }

   handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
   }

   isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

   closeModal = () => this.setState({ modal: false })

   openModal = () => this.setState({ modal: true })

   render() {
      const { channels, modal } = this.state
      return (
         <React.Fragment>
            <Menu.Menu style={{ paddingBottom: '2em', paddingTop: '1em' }}>
               <Menu.Item>
                  <span>
                     <Icon name="exchange" /> CHANNELS
               </span>{' '}
               ({channels.length}) <Icon name="add" onClick={this.openModal} />
               </Menu.Item>
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
               <Modal.Header>Add a channel</Modal.Header>
               <Modal.Content>
                  <Form onSubmit={this.handleSubmit}>
                     <Form.Field>
                        <Input
                           fluid
                           label="Name of Channel"
                           name="channelName"
                           onChange={this.handleChange}
                        />
                     </Form.Field>

                     <Form.Field>
                        <Input
                           fluid
                           label="About the Channel"
                           name="channelDetails"
                           onChange={this.handleChange}
                        />
                     </Form.Field>
                  </Form>
               </Modal.Content>

               <Modal.Actions>
                  <Button color="green" inverted onClick={this.handleSubmit}>
                     <Icon name="checkmark" /> Add
                  </Button>

                  <Button color="red" inverted onClick={this.closeModal}>
                     <Icon name="remove" /> Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </React.Fragment>
      )
   }
}

export default Channels;
