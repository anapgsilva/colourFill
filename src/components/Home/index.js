import React from 'react';
import { withAuthorization } from '../Session';
import Search from '../Search';
import Gallery from './gallery.js';
import Selfie from './selfie.js';

const HomePage = () => {

  return (
    <div>
      <div className="home">
        <h1>Choose Your Picture To Colour</h1>

        <div className="image-source">
          <Search />
          <h5>OR</h5>
          <Selfie />
        </div>
      </div>
      <Gallery />
    </div>
  )

};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
