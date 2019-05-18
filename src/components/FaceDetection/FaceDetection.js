import React from 'react';
import './FaceDetection.css'

const FaceDetection = ({imageUrl ,box }) => {
  return (

    <div className='center pa4 ma4 mt0'>
      <div className= 'absolute mt2'>
        <img id='inputimage'src={imageUrl} width='500px' height='auto' alt=""/>
        <div className='bounding-box' style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
   );
  }

export default FaceDetection;
