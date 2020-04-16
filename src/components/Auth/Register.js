import React from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import md5 from 'md5';

class Register extends React.Component {
   state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
   }

   // the only Function that chacks the validation of our form
   isFormValid = () => {
      let errors = [];
      let error;

      if (this.isFormEmpty(this.state)) {
         // throw an error
         error = { message: 'Fill in all fields!' };
         this.setState({
            errors: errors.concat(error)
         })
         return false
      } else if (!this.isPasswordValid(this.state)) {
         // throw an error
         error = { message: 'Password is invalid!' };
         this.setState({
            errors: errors.concat(error)
         })
         return false
      } else {
         // the form is valid
         return true
      }
   }

   // each of the isFormValid() checking functions are listed here
   isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
      return !username.length || !email.length || !password.length || !passwordConfirmation.length;
   }

   isPasswordValid = ({ password, passwordConfirmation }) => {
      if (password.length < 6 || passwordConfirmation.length < 6) {
         return false;
      } else if (password !== passwordConfirmation) {
         return false;
      } else {
         return true;
      }
   }

   // display error if the form is invalid
   displayErrors = errors => (
      errors.map((error, i) => <p key={i}>{error.message}</p>)
   )

   // update the form state on typing
   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }

   handleSubmit = (event) => {
      event.preventDefault();
      if (this.isFormValid()) {
         this.setState({ errors: [], loading: true })
         firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
               console.log(createdUser);
               createdUser.user.updateProfile({
                  displayName: this.state.username,
                  photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
               })
                  .then(() => {
                     this.saveUser(createdUser).then(() => {
                        console.log('user saved')
                        this.setState({
                           loading: false
                        })
                     })
                  })
            })
            .catch(err => {
               console.log(err);
               this.setState({ errors: this.state.errors.concat(err), loading: false })
            })
            .catch(err => {
               this.setState({
                  errors: this.state.errors.concat(err),
                  loading: false
               })
            })
      }
   }

   saveUser = createdUser => {
      return this.state.usersRef.child(createdUser.user.uid).set({
         name: createdUser.user.displayName,
         avatar: createdUser.user.photoURL
      })
   }

   handleInputError = (errors, inputName) => {
      return errors.some(error =>
         error.message.toString().toLowerCase().includes(inputName)
      ) ? 'error' : ''
   }


   render() {
      const { username, email, password, passwordConfirmation, errors, loading } = this.state
      return (
         <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as="h2" icon color="orange" textAlign="center">
                  <Icon name="slack hash" color="orange" />
                  Register for Slack
               </Header>
               <Form onSubmit={this.handleSubmit} size="large">
                  <Segment stacked>
                     <Form.Input
                        fluid
                        name="username"
                        icon="user"
                        iconPosition="left"
                        placeholder="Username"
                        onChange={this.handleChange}
                        value={username}
                        type="text"
                     />

                     <Form.Input
                        fluid
                        name="email"
                        icon="mail"
                        iconPosition="left"
                        placeholder="Email Address"
                        onChange={this.handleChange}
                        value={email}
                        type="email"
                        className={this.handleInputError(errors, 'email')}
                     />

                     <Form.Input
                        fluid
                        name="password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={password}
                        className={this.handleInputError(errors, 'password')}
                        type="password"
                     />

                     <Form.Input
                        fluid
                        name="passwordConfirmation"
                        icon="repeat"
                        iconPosition="left"
                        placeholder="Confirm Password"
                        onChange={this.handleChange}
                        value={passwordConfirmation}
                        className={this.handleInputError(errors, 'password')}
                        type="password"
                     />
                     <Button
                        className={loading ? 'loading' : ''}
                        disabled={loading}
                        color="orange"
                        fluid
                        size="large">
                        Submit
                     </Button>
                  </Segment>
               </Form>
               {
                  errors.length > 0 && (
                     <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                     </Message>
                  )
               }
               <Message>
                  Already a user ? <Link to="/login">Login</Link>
               </Message>
            </Grid.Column>
         </Grid>
      )
   }
}

export default Register