import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';


const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <PasswordChangeForm />
    )}
  </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
