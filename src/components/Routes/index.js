

import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import ResultsPage from '../Results';
import ActivityPage from '../Activity';
import CameraPage from '../Camera';
import Footer from '../Footer';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faUser);

const Routes = () => (

    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.RESULTS} component={ResultsPage} />
        <Route path={ROUTES.ACTIVITY} component={ActivityPage} />
        <Route path={ROUTES.CAMERA} component={CameraPage} />
        <Footer />

      </div>
    </Router>

);


export default withAuthentication(Routes);
