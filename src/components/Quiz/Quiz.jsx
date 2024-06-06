import React, { useContext,  useEffect,  useState } from 'react'
import QuizTemplate from './QuizTemplate'
import QuizControl from '../Tools/question-navigation/QuizControl'
import { FaArrowAltCircleRight, FaCalculator, FaClock } from 'react-icons/fa'
import { storeAgent } from '../../store/store'
import { Circle } from 'rc-progress'
import '../../index.css'
import Timer from '../Tools/Timer/Timer'
import ModalBox from '../UI/ModalBox'
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [modalIsDislayed, setModalIsDisplayed] = useState(false)
  const [ percentage, setPercentage ] = useState(0)
  // const [percent, setPercent] = useState(0)
  const ctx = useContext(storeAgent)
  const navigate = useNavigate()
  

  //Navigate the user to the submission page

  let { answerIndex, activeQuiz,
        canSubmit, actuallAns} = useContext(storeAgent)

  
//Displaying correct Answer to the user
 
  //Handling submit functionallity

 //Navigating user back to the slect coursss pages
  function sendToNewQuiz(){
    navigate('/app/select-course') 
    localStorage.clear()
    ctx.setActiveQuiz([])
    ctx.setGrade(0)
    ctx.setTime({
      hours: 0,
      minutes: 5,
      seconds: 0
    })
    ctx.setActuallAns(null)
    ctx.setAnswerIndex([])
  } 


  //passing props to the template
  const content = <QuizTemplate Question = { activeQuiz } 
                    setCurrentQuestion = {setCurrentQuestion} 
                    currentQuestion = {currentQuestion}
                    />

  //Calculating progress bar percentage
  useEffect(() => {
    const filteredAgainstNullAndUndefined = answerIndex.filter(Ans => Ans !== null && Ans !== undefined)
    const percentage = Math.trunc(((filteredAgainstNullAndUndefined.length / activeQuiz[0].questions.length ) * 100) )
    setPercentage(percentage)
  }, [answerIndex])

  return (
    <div className='w-[100%] lg:flex lg:flex-row-reverse flex flex-col items-center justify-center mt-[50px] p-2'>
          <div className='lg:w-[30%] w-[94%] flex flex-col items-center justify-center gap-2 lg:mr-4'>
                <div className='flex gap-2 flex-wrap-reverse items-center justify-start self-start'>
                    <button  onClick = {(e) => {
                      e.preventDefault()
                      actuallAns ? sendToNewQuiz():
                      (modalIsDislayed === false ? setModalIsDisplayed(true) : setModalIsDisplayed(false))
                    }}
                      className={`hover:bg-[#564fdc] active:bg-[#564fdc] hover:text-opacity-[0.7]'} self-start px-8 py-3 rounded-md active:translate-y-[-3px]  active:text-white text-[#564fdc] hover:text-white font-bold 
                                  bg-transparent border border-[#564fdc]  `}>{
                                    actuallAns ? 'Start New Quiz' : 'Submit'
                                  }
                  </button>
                </div>
                
                <div className='flex lg:w-full w-full rounded-lg text-white h-auto p-4  bg-gradient-to-b from-[#aab7f7] to-[#4941c1]' >
                  <div className='flex items-center gap-3'>
                      <div className='flex flex-wrap gap-2'>
                        <FaClock size = {'45px'} />
                        <Timer />
                      </div>
                      <button onClick = {ctx.calculatorDisplayHandler}>
                      <FaCalculator size = {'45px'} />
                      </button>
                      <div className=' w-16 h-16 flex relative items-center'>
                        <span className='absolute top-[50%] left-[50%] font-bold text-xl' style={{transform: 'translate(-50%, -50%)'}}>{percentage}<span className='text-xs'>%</span></span>
                        <Circle className='w-[200px]' percent = {percentage} trailColor='#aab7f7' strokeWidth={10} strokeLinecap='round' strokeColor={'white'} trailWidth={'8'} />
                      </div>
                  </div>
            </div>
                  <QuizControl Question = { activeQuiz } setCurrentQuestion = {setCurrentQuestion} 
                    currentQuestion = {currentQuestion} />
          </div>
                {
                  ctx.media <= 1023 ? <div className='flex items-center gap-2 p-2'>
                    <span className='italic'>Use buttons to navigate to any question</span>
                    <span><FaArrowAltCircleRight /></span>
                  </div> : ''
                  }
            <div className = {`flex flex-1 justify-center`}>
                <div className = {`${ctx.media <= 1023 ? 'mt-[30px]' : 'mt-0'}`}>
                { content }
                </div>
                {
                  modalIsDislayed && <ModalBox closeModal = {setModalIsDisplayed}/>
                }
            </div>
    </div>
  )
}

export default Quiz
