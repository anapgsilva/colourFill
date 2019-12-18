import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const CameraPage = (props) => {

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto');

    




  }

  return (
    <div className="camera">
      <Camera
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      />
    </div>
  );
}

export default CameraPage;
