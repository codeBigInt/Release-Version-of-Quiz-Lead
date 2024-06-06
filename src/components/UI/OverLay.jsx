import React from 'react'

const OverLay = (props) => {
  return (
    <div onClick={() => props.closeModal(false)} className='z-30 w-screen h-screen bg-black bg-opacity-15 fixed top-0 left-0'>
      
    </div>
  )
}

export default OverLay
