import React from 'react';
import {Link} from 'react-router-dom';
import colourfill from "../../images/colourFill.png";
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import {Nav, Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';


const Navigation = () => (
  <Nav id="nav">
    <Link to={ROUTES.HOME}>
      <h1 className="navbar-brand"><span>colourFill</span></h1>
    </Link>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuthWithFirebase /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </Nav>
);


const NavigationAuth = ({firebase}) => (
  <div className="loggedin">
    <Nav.Item>
      <Link to={ROUTES.HOME}>Home</Link>
    </Nav.Item>

    <Nav.Item>
      <Dropdown>

        <Dropdown.Toggle className="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <FontAwesomeIcon id="usericon" icon='user' size="2x" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu" aria-labelledby="dropdownMenuButton" alignRight>
          <Link className="dropdown-item" active="true" to={ROUTES.ACCOUNT}>Change Password</Link>
          <Link to={ROUTES.HOME} className="dropdown-item" onClick={firebase.doSignOut} active="true">
            Sign Out
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>

  </div>
);


const NavigationAuthWithFirebase = withFirebase(NavigationAuth);


const NavigationNonAuth = () => (
  <div>
  </div>
);


export default Navigation;
