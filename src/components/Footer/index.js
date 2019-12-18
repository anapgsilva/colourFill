import React from 'react';
import { withAuthorization } from '../Session';

const Footer = () => {

  return (
    <div className="footer">
      <h6>Made with &hearts; Dec 2019</h6>
    </div>
  )

};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Footer);
