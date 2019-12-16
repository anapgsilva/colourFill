import React from 'react';
import { withAuthorization } from '../Session';
import Search from '../Search';
import Gallery from './gallery.js';

const HomePage = () => {

  return (
    <div>
      <Search />
      <hr />
      <Gallery />
    </div>
  )

};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
