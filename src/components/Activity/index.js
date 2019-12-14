import React from 'react';
import { withAuthorization } from '../Session';


const ActivityPage = () => (

  <div>


  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ActivityPage);
