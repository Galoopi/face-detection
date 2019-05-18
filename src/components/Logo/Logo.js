import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './face.png';

const Logo = () => {
  return (
    <div>
    <div className='center pa4 ma4 mt0'>
      <Tilt className=" Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa3"><img src={face} alt="question face "/></div>
      </Tilt>
      <h1 className='w-80 pa2 center shadow-2'>Face Detection App</h1>
     </div>
    </div>
);
}

export default Logo;
