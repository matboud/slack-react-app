import React from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
   state = {
      email: '',
      password: '',
      errors: [],
      loading: false,
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
      if (this.isFormValid(this.state)) {
         this.setState({ errors: [], loading: true });
         firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( signedInUser => {
               console.log(signedInUser);
               this.setState({
                  loading: false
               })
            })
            .catch(err => {
               console.log(err);
               this.setState({
                  errors: this.state.errors.concat(err),
                  loading: false
               });
            })
      }
   }

   isFormValid = ({email, password}) => email && password;

   handleInputError = (errors, inputName) => {
      return errors.some(error =>
         error.message.toString().toLowerCase().includes(inputName)
      ) ? 'error' : ''
   }


   render() {
      const { email, password, errors, loading } = this.state;
      return (
         <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as="h1" icon color="violet" textAlign="center">
                  <Icon name="slack hash" color="violet" />
                  Login to Slack
               </Header>
               <Form onSubmit={this.handleSubmit} size="large">
                  <Segment stacked>
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

                     <Button
                        className={loading ? 'loading' : ''}
                        disabled={loading}
                        color="violet"
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
                  Don't have an account ? <Link to="/register">Register</Link>
               </Message>
            </Grid.Column>
         </Grid>
      )
   }
}

export default Login