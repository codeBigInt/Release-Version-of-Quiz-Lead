import React, { useContext, useState } from 'react'
import '../../../index.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { storeAgent } from '../../../store/store'


const QuizControl = (props) => {
const ctx = useContext(storeAgent)
 const currentQuestion = props.currentQuestion
 const setCurrentQuestion = props.setCurrentQuestion
 const { 
  answerIndex, 
  showNextQuestion, 
  showPreviousQuestion, 
  scrollIndx } = useContext(storeAgent)



  

  return (
    <div className={`w-full  h-auto lg:max-h-[200px] lg:min-h-[200px] bg-[#7f8af0] rounded-md shadow-md
        ${ctx.media <= '1023' ? 'flex items-center' : ''}`}>
          {
            ctx.media <= '1023' ? <span 
            onClick={ (e) => {
            showPreviousQuestion(e, currentQuestion, setCurrentQuestion)
          }}
          className='text-[#564fdc] w-[60px] p-5 border border-[#564fdc] bg-white z-5 flex justify-center item-center'>
        <FaArrowLeft />
      </span> : ''
      }
      <div className='w-full flex lg:flex-wrap gap-2 p-2 overflow-x-scroll scrollbar-hide'>
          {
            props.Question[0].questions.map(btn => {
                return <button onClick = {() => {
                    setCurrentQuestion(btn.id - 1)
                 }} 
                 style = { ctx.media < '1023' ? {transform: `translateX(${scrollIndx}px)`} : {}}
                  className={` 
                  hover:scale-[1.05] active:translate-y-[-8px] px-4 py-2 rounded-md text-[#564fdc] font-extrabold
                  ${answerIndex[btn.id] ? 'bg-[#cad4fb] border-white text-[#564fdc]' : 
                    (currentQuestion === btn.id - 1 ? 'bg-[#564fdc] text-white border border-white' : 'bg-white')}`}>
                  {btn.id }
              </button>
      })
          }
      </div>
      { 
        ctx.media <= '1023' ? <span 
          onClick={(e) => {
            showNextQuestion(e, currentQuestion, setCurrentQuestion)
          }}
          className='text-[#564fdc] w-[60px] p-5 border border-[#564fdc] bg-white z-5 flex justify-center item-center'>
        <FaArrowRight />
      </span> : ''
      }
      
    </div>
    
  )
}

export default QuizControl
