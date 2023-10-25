import React from 'react';
import "./CoverPhoto.css";
import collections from '../../configurations/collections';

function CoverPhoto(props) {
  return (
    <div className='CoverPhoto'>
        <div className='main'>
          <img className='cover-image' src={`${collections.server_base}/cover-photos/${props.imageName}`} alt="" />
        </div>
    </div>
  );
};

export default CoverPhoto;
