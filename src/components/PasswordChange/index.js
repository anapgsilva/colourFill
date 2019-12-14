import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import {Form, Button} from 'react-bootstrap';


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};



class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div className="centred-page">
      <h1>Change your password</h1>
      <Form onSubmit={this.onSubmit}>
        <label>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        </label>
        <label>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        </label>
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
      </div>
    );
  }
}


export default withFirebase(PasswordChangeForm);
