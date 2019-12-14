import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Form, Button} from 'react-bootstrap';



const PasswordForgetPage = () => (
  <div className="centred-page">
    <h1>Reset your password</h1>
    <PasswordForgetForm />
  </div>
);


const INITIAL_STATE = {
  email: '',
  error: null,
};



class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <Form onSubmit={this.onSubmit}>
        <label>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </label>
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}


const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>
      Forgot Password?
    </Link>
  </p>
);


export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
