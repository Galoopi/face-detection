import React from 'react';



const Rank = ({name,entries}) => {
  return (
    <div>
      <div className='black f3'>
        <p>{`${name}, Your Rank is #${entries}`}</p>
      </div>
    </div>
  )
}

export default Rank;
