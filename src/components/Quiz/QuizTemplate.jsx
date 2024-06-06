import React, { useContext, useState, useEffect } from 'react'
import { FaRegCircle, FaCheckCircle, FaAudible, FaSoundcloud, FaHeadphones, FaVolumeUp, FaVolumeDown, FaCheck, FaTimes } from 'react-icons/fa'
import { storeAgent } from '../../store/store'


const QuizTemplate = (props) => {
    //setting up state for the readout text functionallity
    const [isPlaying, setIsPlaying] = useState(false)
    // const [ correctAnswerSheet, setCorrectAnswerSheet ] = useState(null)

    const { answerIndex, activeQuiz, course,  
        setAnswerIndex, actuallAns, 
        showNextQuestion, showPreviousQuestion } = useContext(storeAgent)
    const [speechSynthesisReady, setSpeechSynthesisReady] = useState(false);
    const fetchCorrectAnswers = activeQuiz[0].questions.map( questions => questions.correctAnswer )
    
    // //Fetching the correct answers onLoad of the component
    // useEffect(() => {
    //        //Fetch the corect amswer from the server json file stored in the localstorage
    //        setCorrectAnswerSheet((prev) => {
    //         const fetchCorrectAnswers = activeQuiz[0].questions.map( questions => questions.correctAnswer )
    //         return fetchCorrectAnswers
    //   })
      
    // }, [])


    useEffect(() => {
      if ('speechSynthesis' in window) {
        setSpeechSynthesisReady(true);
      }
      
    }, []);
    //setting answer state and mechanism
    const currentQuestion = props.currentQuestion
    const setCurrentQuestion = props.setCurrentQuestion
    const question = props.Question[0].questions[currentQuestion].question 

    //Trying to synthesize speech from text
    
    const readText = (e) => {
        e.preventDefault()
        
        if(speechSynthesisReady){
            isPlaying === false ? setIsPlaying(true)  : ''
            const readableOptions = Object.entries(options).map(([index, answer]) => (answer))
            const textToReadOut = `${question} ${readableOptions}`
            const words = new SpeechSynthesisUtterance(textToReadOut)
            words.rate = 0.6
            window.speechSynthesis.speak(words)
        }else{
            setIsPlaying(false)
        }
        
    }
    //Trying to dynamically render question display and change functionallity
    const options = props.Question[0].questions[currentQuestion].choices
    const questionId = props.Question[0].questions[currentQuestion].id 

        //Hnadling answer change
    const answerHandler = (answer, index) => {
        setAnswerIndex(prevSelectedAnswers => {
            let newAnswers = [...prevSelectedAnswers]
            newAnswers[index] = answer
            console.log(newAnswers);
            localStorage.setItem('selected', JSON.stringify(newAnswers))
            return newAnswers
        })
        // console.log(correctAnswerSheet);
    }

    
    return (
    <div className='flex flex-col items-center px-2'>
        <div className='mt-3 mb-7 flex flex-col justify-center items-center text-[#564fdc]'>
            <div className='flex gap-6 justify-center items-center'>
                <div className='flex flex-col items-center'>
                    <h2 className='text-black lg:text-md text-xl'>Category: {course}</h2>
                    <div className='flex text-3xl'>
                        <span className='font-bold'>{currentQuestion + 1}</span>
                        <span className='font-bold'>/</span>
                        <span className='font-bold'>{props.Question[0].questions.length}</span>
                    </div>
                </div>
                <button onClick = {readText}
                    className='bg-[#564fdc] p-2 rounded-full text-white shadow-2xl inset-3'>
                    {isPlaying ? <FaVolumeUp className='scale-x-300' size = {'25px'}/> : <FaVolumeDown className='scale-x-300' size = {'25px'}/>}
                </button>
            </div>
            
            <h1 
            className='lg:text-xl text-2xl text-center font-bold px-3 mt-3 mb-7 text-black'>
                { question }
            </h1>
        </div>
        
        <ul key = {props.Question[0].questions[currentQuestion].id} className='w-1/1 flex md:gap-8 justify-center items-center flex-wrap'>
            {
                Object.entries(options).map(([index, answer]) => {
                return <button  disabled = { actuallAns ? true : false }  key = { index } onClick = {() => {
                                answerHandler(answer, questionId)
                            }} 
                            style={{background: `${fetchCorrectAnswers.includes(answer) && actuallAns ? 'grey': ''}`}}
                            className={`${answerIndex[questionId] === answer ? 'bg-gradient-to-r from-[#3d379c] to-[#4941c1] text-white' : 'bg-transparent'}
                                cursor-pointer md:mt-0 mt-5 flex gap-2 justify-between hover:bg-[#aab7f7]
                                text-[#564fdc] self-center rounded-md border-[#564fdc] 
                                items-center lg:w-[45%] w-[95%] border px-3 py-3 relative
                                ${fetchCorrectAnswers.includes(answer) && actuallAns ? ' bg-[grey] text-white border-0' : ''}`}>
                                    <div className=' flex gap-2 items-center'>
                                        {answerIndex[questionId] === answer ? <FaCheckCircle /> : <FaRegCircle />}
                                        <span>{ answer }</span>
                                    </div>
                                
                                    {fetchCorrectAnswers.includes(answer) && actuallAns  ? 
                                    <FaCheck className='text-white absolute right-[20px] text-4xl font-extrabold p-1 rounded-full' /> : ''}
                        </button>
              } )
            }
        </ul>  
        <div className='flex items-center w-full text-white gap-4 my-8 justify-center'>
            {currentQuestion === 0 ? null :  <button 
                onClick = { (e) => showPreviousQuestion(e, currentQuestion, setCurrentQuestion) } 
                className='px-8 py-3 rounded-md active:translate-y-[-3px] bg-[#564fdc] active:bg[#564fdc] hover:bg[#564fdc]'>
                Previous
            </button>}
            <button
                onClick = { (e) => showNextQuestion(e, currentQuestion, setCurrentQuestion) } 
                className='px-8 py-3 rounded-md active:translate-y-[-3px] bg-[#564fdc] active:bg[#564fdc] hover:bg[#564fdc]'>
                Next
            </button>
        </div>
    </div>
  )
}

export default QuizTemplate