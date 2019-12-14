import React from 'react';
import { withAuthorization } from '../Session';
import Search from '../Search';


const HomePage = () => (

  <div>
    <Search />
    <hr />
    <h1>My Colouring Pictures</h1>
    <p>The Home Page is accessible by every signed in user.</p>

  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
