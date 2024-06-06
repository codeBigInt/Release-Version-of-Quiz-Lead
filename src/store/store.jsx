import { createContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from "../components/Forms/userSlice";
// import { activeQuiz } from '../components/data'

export const storeAgent = createContext({})


//default dark mode setting


const StoreProvider = (props) => {
  const [canSubmit, setCanSubmit] = useState(() => {
    const storedState =  localStorage.getItem('cantSubmit')
    return storedState ? storedState : false
  })
  const [actuallAns, setActuallAns] = useState(() => {
    const storedState =  localStorage.getItem('correctAns')
    return storedState ? storedState : null
  })
  //setting score of user into an array of off objects
  const [answerIndex, setAnswerIndex] = useState(() => {
    const storedAnswers = localStorage.getItem('selected')
    return storedAnswers ? JSON.parse(storedAnswers) : []
  })


  //Setting active state
  const [mode, setMode] = useState(() => {
    const storedVal = localStorage.getItem('mode')
    return storedVal ? storedVal : 'DarkMode'
  })

  //Managing Post Request
  const [postData, setPostData] = useState(null)
  const [formData, setFormData] = useState(() => {
    const storedDetails = localStorage.getItem('formData')
    return storedDetails ? JSON.parse(storedDetails) : {
      title: null,
      description: null,
      hours: 0,
      minutes: 0,
      seconds: 0
  }
  })


  //For Question available on the local storage
  const [activeQuiz, setActiveQuiz] = useState(() => {
    const questionToDispaly = localStorage.getItem('testQuiz')
    return questionToDispaly ? JSON.parse(questionToDispaly) : []
  })


  //Setting FeedBak Info For the user
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)


  const [scrollLeftActive, setScrollLeftActive] = useState(false)
  const [scrollRightActive, setScrollRightActive] = useState(false)
  const [scrollIndx, setScrollIndx] = useState(0)

  const [grade, setGrade] = useState(() => {
    const storedVal = localStorage.getItem('marks')
    return storedVal ? storedVal : 0
  })
  
  

  //creatting state to manage the  display of either submit or select other quiz button


  const [count, setCount] = useState(0)
  const [media, setMedia] = useState(window.innerWidth)
  const [showCalculator, setShowCalculator] = useState(false)
  const [course, setCourse] = useState('')

  const calculatorDisplayHandler = () => {
    showCalculator === false ? setShowCalculator(true) : setShowCalculator(false)
  }

  const [questions, setQuetions] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('Dark')
    return (storedMode ? JSON.parse(storedMode) : null)
  })

      //Timing
      const [time, setTime] = useState(() => {
        const storedTime = localStorage.getItem('timer')
        return storedTime ? JSON.parse(storedTime) : 
        {
            hours: 0,
            minutes: 5,
            seconds: 0
        }})

  const dispatch = useDispatch()
  
  //Handling the screen size change
  useEffect(() => {
      const updateWindowChange =  () => {
          setMedia(window.innerWidth)
      }
      window.addEventListener( 'resize', updateWindowChange )

      return () => window.removeEventListener( 'resize', updateWindowChange)
  }, [ media ])
  
      //Functiom that handles submit
      const handleSubmit = () => {
        //Fetch the corect amswer from the server json file stored in the localstorage
        const fetchCorrectAnswers = activeQuiz[0].questions.map( questions => questions.correctAnswer )
        answerIndex.forEach( answer => {
          if(fetchCorrectAnswers.includes(answer)){
            //resolve to setting the grade for the user
            setGrade(prev => {
              let newScore = prev + 1
              localStorage.setItem('marks', newScore)
              return newScore
            })
            console.log('caught red handed');
          }
        })
  }
  const fixTimer = () => {
    //Fixng the Timer
    setTime( leftOverTime => {
      let reviewTimeDisplay = { ...leftOverTime }
        reviewTimeDisplay.hours = 0
        reviewTimeDisplay.minutes = 0
        reviewTimeDisplay.seconds = 0
        localStorage.setItem('timer', JSON.stringify(reviewTimeDisplay))
        return reviewTimeDisplay
    } )
  }

    //can subitt display handler
    function reSelectHandler(){
      if(canSubmit === false){
        setCanSubmit(prev => {
         let val = prev
         val = true
         localStorage.setItem('cantSubmit', val)
         return val
       })
      }else setCanSubmit(false)
    }

//Signing the user out

  const logUserOut = () => {
    if(confirm('Are You Sure You Want To QUit The Test')){
      signOut(auth).then(() => {
        dispatch(setUser({currentUser: null, isAuthenticated: false}))
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
        setErrorMessage(null)
        setSucessMessage(null)
      }).catch((error) => {
        // An error happened.
        console.log(error.message);
      });
    }
  }


  //Dark Mode settings
    const dark = {
        bg: 'bg-[#181818]',
        sideBg: 'bg-gradient-to-l from-[#564FDC] to-[#4941C1]',
        textColor: 'text-white',
        btn: 'border-[1px] border-[#AAB7F7] text-[#aab7f7]',
        btnHover: 'bg-[#35337c]',
        btnActive: 'bg-[#201e48]',
        mode: mode
    }

    function darkModeHandler(){
        if(darkMode === false){
            setDarkMode(true)
            setMode('LightMode')
            localStorage.setItem('Dark', JSON.stringify(dark))
            localStorage.setItem('mode', mode)
        }else{
            setMode('DarkMode')
            setDarkMode(false)
            localStorage.removeItem('Dark')
            localStorage.removeItem('mode')
        }
    }
    
  
    
//Handling questions next and preview
const showNextQuestion = (e, currentQuestion, setCurrentQuestion) => {
  e.preventDefault()
  currentQuestion < activeQuiz[0].questions.length - 1 ? setCurrentQuestion(prev => prev += 1) 
  : setCurrentQuestion(activeQuiz[0].questions.length - 1)
  const scrollRight = () => {
    currentQuestion < activeQuiz[0].questions.length - 1 ? setScrollIndx( prev  => prev += -50) : null
    setScrollRightActive ? setScrollRightActive(true) : setScrollRightActive(false)
  }
  scrollRight()
}



const showPreviousQuestion = (e, currentQuestion, setCurrentQuestion) => {
  e.preventDefault()
  currentQuestion > 0 ? setCurrentQuestion(prev => prev -= 1) : setCurrentQuestion(0)
  const scrollLeft = () => {
    currentQuestion > 0 ? setScrollIndx( prev  => prev += 50) : setScrollIndx(0)
    scrollLeftActive ? setScrollLeftActive(true) : setScrollLeftActive(false)

  }
  scrollLeft()
}


    const values = {
        darkModeHandler: darkModeHandler,
        darkMode: darkMode,
        setDarkMode: setDarkMode,
        dark: dark,
        mode: mode,
        media: media, logUserOut, postData, setPostData,
        showCalculator: showCalculator,
        calculatorDisplayHandler: calculatorDisplayHandler,
        setQuetions: setQuetions,
        questions: questions, scrollIndx, course, setCourse, errorMessage, setErrorMessage, sucessMessage, setSucessMessage,
        count, setCount, grade, setGrade, activeQuiz, time, setTime,
        answerIndex, setAnswerIndex, actuallAns, setActuallAns, canSubmit, handleSubmit,
        reSelectHandler, showNextQuestion, showPreviousQuestion, setActiveQuiz, fixTimer,formData, setFormData
    }

    return(
        <storeAgent.Provider value={values}>
            {props.children}
        </storeAgent.Provider>
    )
}

export default StoreProvider