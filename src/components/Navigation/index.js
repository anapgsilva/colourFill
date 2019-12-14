import React from 'react';
import {Link} from 'react-router-dom';
import colourfill from "../../images/colourFill.png"
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import {Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownButton from 'react-bootstrap/Dropdown';

import * as ROUTES from '../../constants/routes';


const Navigation = () => (
  <Nav>
    <Link to={ROUTES.HOME}>
      <img src={colourfill} width="200" alt="Home" className="navbar-brand" />
    </Link>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </Nav>
);


const NavigationAuth = () => (
  <div className="loggedin">
    <Nav.Item>
      <Link to={ROUTES.HOME}>Home</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to={ROUTES.ACCOUNT}>
        <FontAwesomeIcon icon='user' size="2x" />
      </Link>
    </Nav.Item>
    <Nav.Item>
      <SignOutButton />
    </Nav.Item>

  </div>
);


const NavigationNonAuth = () => (
  <div>

  </div>
);



export default Navigation;
