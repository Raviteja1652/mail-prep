import React from 'react';
import './Wrapper.css'

const Wrapper = (props) => {
  return (
    <div className='wrapper'>
        <div className='wrapper-content'>{props.children}</div>
    </div>
  )
}

export default Wrapper;