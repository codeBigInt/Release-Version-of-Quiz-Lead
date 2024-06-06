import React, { useContext, useState } from 'react'
import '../../index.css'
import { FaArrowLeft, FaArrowRight, FaRegTimesCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'
import { storeAgent } from '../../store/store'

const QuizDetails = (props) => {
const { setFormData, formData } = useContext(storeAgent)
const [canSetTimer, setCanSetTimer] = useState(false)
const inputHandler = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
        const newData = {...prev}
        newData[name] = value
        return newData                            
    })
}

function handleSubmit(e) {
    e.preventDefault()
    localStorage.setItem('formData',JSON.stringify(formData))
    // setFormData()
    props.setIsAdding(true)
    props.closeModal()
    console.log(formData);
    //We want to construct a new array with the form data and send to Firebase
    
}

  return (
    <div className='w-screen h-screen fixed  z-40 '>
        <div className='fixed top-[15%] left-[20%] w-[60%] justify-center items-center flex flex-col'>
        
        <form onSubmit = {handleSubmit} className=' p-[1em] relative rounded-2xl  lg:w-[100%] w-[90%]  bg-white text-slate-600'>
            <div className='bg-white w-full flex flex-col'>
                <div className='flex justify-between items-center w-full'>
                    <h3 className='font-bold text-xl py-4'>Create A New Quiz</h3>
                    <button onClick={() => props.closeModal(false)} className=' text-[#564cde] rounded-full my-3 p-2 text-2xl ' type="button">
                        <FaRegTimesCircle />
                    </button>
                </div>
                {
                    canSetTimer ? <div className='w-full flex flex-col p-[2em] gap-[0.75em]'>
                        <label className='text-sm' htmlFor="timer"> Set Timer - NB: Format must be; hr = 0 - 2, mins = 0 - 59 & sec = 0 - 59</label>
                        <div className='flex justify-start self-start w-full py-4'>
                            <div className='w-full flex flex-col justify-center gap-2 items-center'>
                                <input value={formData.hours} onChange = {(e) => inputHandler(e)} required 
                                    className='time-box' min='0' max='2' type="number" name="hours"/>
                                <label htmlFor="hours" className='text-xs'>hrs</label>
                            </div>
                            <div className='w-full flex flex-col justify-center gap-2 items-center'>
                                <input value={formData.minutes} onChange = {(e) => inputHandler(e)} required 
                                    className='time-box' min='0' max='59' type="number" name="minutes"/>
                                <label htmlFor="minutes" className='text-xs'>mins</label>
                            </div>
                            <div className='w-full flex flex-col justify-center gap-2 items-center'>
                                <input value={formData.seconds} onChange = {(e) => inputHandler(e)} required 
                                    className='time-box' min='0' max='59' type="number" name="seconds"/>
                                <label htmlFor="seconds" className='text-xs'>sec</label>
                            </div>
                        </div>
                    </div> : <div className='flex flex-col w-full gap-[.75em]'>
                      <label className='text-sm' htmlFor="title">Quiz Title</label>
                      <input value={formData.title} onChange = {(e) => inputHandler(e)} 
                          className='p-[.7em] outline-none rounded-md bg-transparent text-black border border-slate-500' 
                          type="text" name="title" required/>
                      <label className='text-sm' htmlFor="description">Description</label>
                      <input value={formData.description} onChange = {(e) => inputHandler(e)}
                          className='p-[.7em] outline-none rounded-md bg-transparent text-black border border-slate-500' 
                          type="text" name="description" required/>
                  </div>  
                }
                {
                    canSetTimer ? <div className='flex justify-between'>
                        <button onClick={() => {
                            canSetTimer === true ? setCanSetTimer(false) : setCanSetTimer(true)
                        }}
                        type="submit" 
                        className='p-[.7em] px-[1.5em] flex justify-center items-center gap-6 font-bold rounded-md m-2 bg-[#564cde] text-white'>
                            <FaArrowLeft />
                        </button>
                        <button  onClick={(e) => {handleSubmit(e)}}
                        type="submit" 
                        className='p-[.7em] flex justify-center items-center gap-6 font-bold rounded-md m-2 bg-[#564cde] text-white'>
                        Next Step 
                        <FaArrowRight />
                        </button>
                    </div> :
                    <button 
                        onClick={() => {
                            canSetTimer === false ? setCanSetTimer(true) : setCanSetTimer(false)
                        }}
                        type="submit" 
                        className='p-[.7em] self-end flex justify-center items-center gap-6 font-bold rounded-md my-2 bg-[#564cde] text-white'>
                        Next Step 
                        <FaArrowRight />
                    </button>
                }
            </div>
        </form>
        
    </div>
    </div>
    
  )
}

export default QuizDetails
