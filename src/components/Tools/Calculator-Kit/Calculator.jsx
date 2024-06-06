import React, { useContext, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaRegTimesCircle, FaTimesCircle } from 'react-icons/fa'
import '../../../index.css'
import { storeAgent } from '../../../store/store'
import { motion } from 'framer-motion'

const Calculator = () => {
 const [display, setDisplay] = useState('')
 const ctx  = useContext(storeAgent)
const dragRef = useRef(null)

 const updateDisplay = (e) => {
    e.preventDefault()
    setDisplay(prev => {
        const val = e.target.value
        const newDisplay = `${prev}${val}`
        return newDisplay
    })
 }
 
 const clearDisplay = (e) => {
    e.preventDefault()
    setDisplay('')
 }
 const deleteLatestDigit = (e) => {
    e.preventDefault()
    setDisplay(prev => {
        const newDisplay = prev.toString().slice(0, -1)
        return newDisplay
    })
 }
 const solve = (e) => {
    e.preventDefault()
    setDisplay(currenVal => {
        const answer = eval(currenVal)
        return answer
    })
 }

  return (
    <div ref={dragRef} className='w-screen z-20 fixed  lg:z-20 flex flex-col justify-center items-center overflow-x-hidden overflow-y-scroll h-screen bg-black bg-opacity-[0.5]'>
     <motion.div
        drag
        whileHover={{ scale: 1.03 }}
        dragTransition={{ bounceStiffness: 950, bounceDamping: 15 }}
        dragConstraints={dragRef}
        className='lg:w-[25%] z-50 w-[100%] rounded-t-[50px] lg:rounded-none  lg:bg-transparent h-[80%] fixed flex flex-col-reverse lg:flex-col justify-center items-center mt-[50px]' >
            {ctx.media < 1023 ? <button className='py-3 text-white' onClick = {ctx.calculatorDisplayHandler}>
                <FaRegTimesCircle size={'32px'} />
            </button> : 
            <button className='lg:self-end py-2 px-2 font-bold text-white' onClick = {ctx.calculatorDisplayHandler}>
            <FaRegTimesCircle size={'20px'} />
            </button>}
        <form id='calculator' 
            className='z-30 flex flex-col  lg:w-[100%] w-[70%] max-w-[450px] rounded-lg bg-[#111] p-6'>
            <input className='p-4 rounded-md text-white font-bold text-3xl bg-green-950' value = {display} placeholder='0' type='text' disabled/>
            <div className='w-full  p-1'>
                <div className='flex w-full justify-center gap-[5%] my-2'>
                    <button onClick = {updateDisplay} className='btn' value = {'sin'}>
                        sin
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'cos'}>
                        cos
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'tan'}>
                        tan
                    </button>
                    <button onClick = {clearDisplay} className='btn spec'>
                        AC
                    </button>
                </div>
                <div className='flex w-full justify-center gap-[5%] my-2'>
                    <button onClick = {updateDisplay} className='btn' value = {'1'}>
                        1
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'2'}>
                        2
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'3'}>
                        3
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'+'}>
                        +
                    </button>
                </div>
                <div className='flex w-full justify-center gap-[5%] my-2'>
                    <button onClick = {updateDisplay} className='btn' value = {'4'}>
                        4
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'5'}>
                        5
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'6'}>
                        6
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'-'}>
                        -
                    </button>
                </div>
                <div className='flex w-full justify-center gap-[5%] my-2'>
                    <button onClick = {updateDisplay} className='btn' value = {'7'}>
                        7
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'8'}>
                        8
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'9'}>
                        9
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'*'}>
                        x
                    </button>
                </div>
                <div className='flex w-full justify-center gap-[5%] my-2'>
                    <button onClick = {updateDisplay} className='btn' value = {'.'}>
                        .
                    </button>
                    <button onClick = {updateDisplay} className='btn' value = {'0'}>
                        0
                    </button>
                    <button className='btn danger' onClick = {deleteLatestDigit}>
                        DEL
                    </button>
                    <button onClick = {updateDisplay} className='btn evaluate' value = {'/'}>
                        /
                    </button>
                </div>
                <div className='flex w-full justify-center gap-[5%] my-2'>
                    <button className='btn evaluate last my-3' onClick = {solve}>
                        =
                    </button>
                </div>
                
            </div>
        </form>     
     </motion.div>
    
    </div>
  )
}

export default Calculator
