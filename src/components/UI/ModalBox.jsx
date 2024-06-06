import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaDoorClosed, FaSpeakap, FaSpeakerDeck, FaWindowClose } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { storeAgent } from '../../store/store'

const ModalBox = (props) => {
    const navigate = useNavigate()
    const { handleSubmit } = useContext(storeAgent)

  return (
    <div className='fixed w-screen h-screen overflow-y-scroll left-0 z-10 flex justify-center'>
        <div onClick = {(e) => {
                    e.preventDefault()
                    props.closeModal(false)
                }} className='w-[100%] fixed z-10 top-0 left-auto h-screen bg-black bg-opacity-5'></div>
        
        <motion.div  
            initial = {{y: '-100%'}}
            animate = {{y: '0'}}
            className=' fixed right-auto top-[18%] lg:right-auto lg:w-[30%] w-[85%] z-20 shadow-lg rounded-lg  lg:rounded-md bg-white p-8'>
            <div className='flex gap-2 items-center my-3'>
                <h3 className='text-lg font-bold'>Warning</h3>
                <FaWindowClose className='text-[#564fdc]' size={'25px'} />
            </div>
            <div className='my-5'>
                <p className='text-sm'>
                    You will be logged out once you confirm your submission and wiil not be able to retake the Quiz.
                </p>
                <p className='text-sm'>Ensure you have answered all the necessary questions</p>
            </div>
            
            <div className='mt-3 w-[100%] lg:flex-row flex flex-col gap-3 items-center lg:justify-start justify-center'>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                    navigate('/app/submission')
                }} 
                    className='p-2 py-4 active:bg-[#564fdc] lg:w-auto w-[90%] hover:bg-[#564fdc] rounded-3xl hover:text-white active:text-white font-bold px-5 text-sm text-[#564fdc] border border-[#564fcc]  bg-transparent'>
                    Confirm
                </button>
                <button onClick = {(e) => {
                    e.preventDefault()
                    props.closeModal(false)
                }}  className='p-2 py-4 lg:ml-3 active:bg-[#564fdc] lg:w-auto w-[90%] hover:bg-[#564fdc] rounded-3xl hover:text-white active:text-white font-bold px-5 text-sm text-[#564fdc] border border-[#564fcc]  bg-transparent'>
                    Back To Quiz
                </button>
            </div>
        </motion.div>
    </div>
  
    
  )
}

export default ModalBox
