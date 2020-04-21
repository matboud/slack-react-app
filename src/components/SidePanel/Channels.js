import React, { Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';


class Channels extends Component {
   state = {
      activeChannel: '',
      currentUser: this.props.currentUser,
      channels: [],
      modal: false,
      channelName: '',
      channelDetails: '',
      channelRef: firebase.database().ref('channels'),
      firstLoad: true,
   }

   componentDidMount() {
      this.addListener();
   }

   componentWillUnmount() {
      this.removeListener();
   }

   addListener = () => {
      let loadedChannels = [];

      this.state.channelRef.on('child_added', snap => {
         loadedChannels.push(snap.val());
         this.setState({
            channels: loadedChannels,
         }, () => this.setFirstChannel());
      })
   }

   removeListener = () => {
      this.state.channelRef.off();
   }

   setFirstChannel = () => {
      const firstChannel = this.state.channels[0];

      if (this.state.firstLoad && this.state.channels.length > 0) {
         this.props.setCurrentChannel(firstChannel);
         this.setActiveChannel(firstChannel);
      }
      this.setState({ firstLoad: false })
   }
 
   // when submitting a form
   handleSubmit = event => {
      event.preventDefault();
      if (this.isFormValid(this.state)) {
         this.addChannel(this.state);
      }
   }

   // function that add a new channel to the DB
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

   // on writing on modal's forms
   handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
   }

   setActiveChannel = channel => {
      this.setState({activeChannel: channel.id});
   }

   changeChannel = channel => {
      this.setActiveChannel(channel);
      this.props.setCurrentChannel(channel);
   }

   displayChannels = channels => (
      channels.length > 0 && channels.map(channel => (
         <Menu.Item
            key={channel.id}
            onClick={() => this.changeChannel(channel)}
            name={channel.name}
            style={{ opacity: 0.7 }}
            active={channel.id === this.state.activeChannel}
         >
            # {channel.name}
         </Menu.Item>
      ))
   )

   // checking if the form is not empty
   isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

   // closingModalFunction
   closeModal = () => this.setState({ modal: false })

   // openModal function
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
               {this.displayChannels(channels)}
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



export default connect(null, { setCurrentChannel })(Channels);
