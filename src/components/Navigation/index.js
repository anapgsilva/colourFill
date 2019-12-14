import React from 'react';
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import {Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as ROUTES from '../../constants/routes';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
);


const NavigationAuth = () => (
  <Nav className="loggedin">
    <Nav.Item>
      <Link to={ROUTES.HOME}>Home</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to={ROUTES.ACCOUNT}> <FontAwesomeIcon icon='user' size="2x" /></Link>
    </Nav.Item>
  </Nav>
);


const NavigationNonAuth = () => (
  <Nav className="loggedout">
    <Nav.Item>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Nav.Item>
  </Nav>
);



export default Navigation;
