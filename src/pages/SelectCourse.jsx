import React, { useEffect, useState, useContext } from 'react'
import { FaReact, FaCheck, FaCode, FaJs } from 'react-icons/fa'
import { database } from '../firebaseConfig'
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import spinner from '../components/Assets/images/spinner.gif'
import { storeAgent } from '../store/store';
import '../../src/index.css'


//Dummy Courses array
const availableCourseArray = [
  {
    id: 't1',
    color: '#863EFF',
    icon: <FaReact size = {60} className='py-3' />,
    value: 'ReactJs',
    desc: 'Cupidatat pariatur nulla non nisi magna. Enim tempor non Lorem ad eu fugiat.',
    test: 'React'
  },
  {
    id: 't2',
    color: '#FF6332',
    icon: <FaCode size = {60} className='py-3' />,
    value: 'HTML',
    desc: 'Cupidatat pariatur nulla non nisi magna. Enim tempor non Lorem ad eu fugiat.',
    test: 'Code'
  },
  {
    id: 't3',
    color: '#4AAF47',
    icon: <FaJs size = {60} className='py-3' />,
    value: 'Javasript',
    desc: 'Cupidatat pariatur nulla non nisi magna. Enim tempor non Lorem ad eu fugiat.',
    test: 'Js'
  },
]

const instructions = [
  'Once The test begins, an attempt to logout will assume you have taken the test',
  'You Can only select a single choice for each question',
  'After Completion of the test click the submit button to end the test',
  'Click the volume Button to enable auto-read out'
]

const SelectCourse = () => {

  const [activeSelectedCourse, setActiveSelectedCourse]  = useState([]) 
  const [btnIsDisabled, setBtnIsDisabled] = useState(true)
  const [errorOccured, setErrorOccured] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [value, setValue] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  


  const { setActiveQuiz, setCourse,  } = useContext(storeAgent)
  const navigate = useNavigate()

    const setTest = async () => {
      try {
        console.log('startedfetching');
        setErrorOccured(false)
        setIsFetching(true)
        setErrMsg('Initializing')
        const fetchRef = await getDoc(doc(database, 'Quiz', value))
          if (fetchRef.exists()) {
            setCourse(fetchRef.id)
            setActiveQuiz(prev => {
              let newUpdate = prev
              newUpdate = [fetchRef.data()]
              localStorage.setItem('testQuiz', JSON.stringify(newUpdate))
              return newUpdate
            })
            navigate('/app/quiz')
          } else {
            // docSnap.data() will be undefined in this case
            console.log("An Error occured");
            setBtnIsDisabled(true)
          }
        }catch (error) {
        if(error){
          setErrorOccured(true)
          setBtnIsDisabled(true) 
        }else{
        setErrorOccured(false)
          setBtnIsDisabled(false) 
    }}}
    const handleSelectedActiveCourse = async (newId, val) => {
          setActiveSelectedCourse(prev => {
            const newArray = [...prev]
            newArray[newId] = val
            return newArray
          })
          setValue(val)
          setIsFetching(false)
          setBtnIsDisabled(false)
      }

      
      
      
      
  return (
    <div className='w-[100%] bg-[#F0F0FF] flex flex-col items-center'>
      <main className='flex flex-col items-center bg-transparent h-full lg:w-full w-[95%] p-3 mt-[40px]'>
      
      <section className='flex flex-col'>
      <span className='bg-[#564fdc] px-4 py-2 rounded-md text-white mb-4 w-1/1'>INSTRUCTION</span>

        {
          instructions.map(inst => (
            <p key={inst} className='flex items-center gap-2 text-xs lg:text-sm my-2'>
              <span className='p-2 rounded-full bg-transparent border border-[#564fdc] text-[#564fdc] font-extrabold'>
                <FaCheck size={'8px'}/>
              </span>
              <span>{inst}</span>
            </p>
          ))
        }
      </section>
      <span className='my-3 font-bold'>SELECT QUIZ TO BEGIN TEST</span>
      <section className='flex p-3 gap-3 w-screen flex-wrap justify-center items-center'>
          {
            availableCourseArray.map(test => (
              <button key={test.id} value = {test.value} onClick = {(e) => {
                e.preventDefault()
                handleSelectedActiveCourse(test.id, test.value)
                }} 
                style={{transitionDelay: '.2s', backgroundColor: `${test.color}`}}
                 className={`relative hover:scale-[1.05] flex flex-col md:flex-row justify-center items-center cursor-pointer 
                    text-center my-[20px] rounded-t-2xl rounded-b-md text-white flex-wrap px-3 py-7 
                    cusor-pointer  w-[85%] md:w-[20%] shadow-md`}>
                      <div>
                        {test.icon}
                      </div>
                      <div>
                        <h3 className='py-3 font-bold'>{test.value}</h3>
                        <p className='text-xs'>
                          {test.desc}
                        </p>
                      </div>
                      {
                        activeSelectedCourse[test.id] === test.value ? 
                        <div className = 'absolute rounded-b-md rounded-t-2xl flex flex-col justify-center items-center bg-black bg-opacity-[0.5] w-full h-full' >
                            <div className = 'flex flex-col items-center justify-center gap-3'>
                              <div className= {`bg-transparent p-4 border-4
                                  rounded-full text-2xl border-white text-white`}>
                                  <FaCheck  />
                              </div> 
                            </div> 
                        </div> : ''    
                      }
            </button>
          ))}
      </section>
      <div className= 'w-screen flex justify-center'>
          {errorOccured ? <div className='w-[85%] text-sm lg:w-[30%]  text-center p-2'>
            Oops! Check your internet connection, Reselect Course
          </div> : ''
          }
      </div>
      <button 
        onClick = { () => {setTest()}}
        disabled = {btnIsDisabled} 
        className={`${btnIsDisabled === false ? 'bg-[#564fdc]' : 'bg-[#564fdc] opacity-50' } px-10 py-3 mb-8 rounded-3xl
       text-white flex gap-2 font-semibold`}>
        {isFetching ? <img src={spinner} alt='...' className='w-[25px]'/> : ''}
        <span>{isFetching ? 'Initializing' : 'Start Quiz'}</span>
      </button>
    </main>
    </div>
    
  )
}

export default SelectCourse

