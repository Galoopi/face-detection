import React from 'react';
import './ImageLinkBox.css'

const ImageLinkBox = ({ onInputChange, onButtonSubmit}) => {
  return (
  <div>
    <p className='f3'>
      {'This app will detect any Human faces in pictures'}
    </p>

    <div className='center'>
      <div className=' center pa4 br3 shadow-5'>
        <input className='f4 pa2 w-80 center' type="tex" onChange={onInputChange}/>
        <button
          className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
          onClick={onButtonSubmit}
        >Detect</button>
      </div>
    </div>
  </div>

)
}

export default ImageLinkBox;
