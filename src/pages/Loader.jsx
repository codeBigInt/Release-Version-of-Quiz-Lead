import React from 'react'
import spinner from '../components/Assets/images/spinner.gif'
// import './Loader.css'

const Loader = () => {
  return (
    <div className='w-sceen h-screen bg-[#f0f0ff] flex flex-col gap-2 justify-center items-center'>
        <img className='w-[50px]' src={spinner} alt="Quiz Lead" />
        {/* <div className="spinner">
            <div className="crossOne"></div>
            <div className="circle"></div>
            <div className="cross2"></div>
        </div> */}
        <p className="className">Just A Moment...</p>
    </div>
  )
}

export default Loader
