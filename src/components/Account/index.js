import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import PasswordChangeForm from '../PasswordChange';
import SignOut from '../SignOut';


const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <Link to={ROUTES.PASSWORD_CHANGE}><PasswordChangeForm/></Link>
        <SignOut />
      </div>
    )}
  </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
