import React from 'react';
import { withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import camera from '../../images/camera.png';

const Selfie = () => {

  return (
    <div className="selfie">
      <h5>Take a Selfie</h5>
      <Link to={ROUTES.CAMERA}>
        <img src={camera} size="0.5" alt="camera icon"/>
      </Link>
    </div>
  )

};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Selfie);
