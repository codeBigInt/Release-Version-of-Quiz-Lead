import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaAngleDown, FaAngleUp, FaBars, FaSignOutAlt, FaTimes } from 'react-icons/fa'
import quizicon from '../Assets/images/quizicon.png'
import user from '../Assets/images/user.jpg'
import { storeAgent } from '../../store/store'
import { useSelector } from 'react-redux'
import { currentUserSelector, setUser } from '../Forms/userSlice'

//Overlay

export const Overlay = (props) => {
  return <div className='w-screen fixed z-10 top-0 h-screen bg-black bg-opacity-5' onClick={props.menuToggler}></div>
}
//Creating the dropdowns for the navbar
export const DropDown = (props) => {
  const userName = useSelector(currentUserSelector)
  const { logUserOut } = useContext(storeAgent)

  return(
    <motion.Card intitial = {{x: '-100%'}} animate = {{x: '0'}} transition = {{delay: 5}}
          className=' fixed  right-0 lg:right-0 lg:w-[35%] w-[70%] z-20 shadow-lg bg-white h-screen p-8'>
          <div className='h-[80%] w-1/1 mt-[50px] flex flex-col gap-3 p-2 '>
            <h3 className='my-4 text-md font-bold text-lg italic'>Welcome Back ! 🎉
              <span className=' pl-1'></span>
            </h3>
              <div className='w-1/1'>
                  <label className='block font-bold text-xs text-slate-500'>Email</label>
                  <p  className=' w-[1/1] font-semibold pt-3 text-sm cursor-pointer rounded-md my-2'>{userName}</p>
              </div>
              <button onClick = {(e) => {
                e.preventDefault()
                props.menuToggler()
                logUserOut()
                }} className='flex active:border font-bold text-[#564fdc]  gap-3 px-2 rounded-md  items-center text-left text-sm group bg-slate-300 py-3 cursor-pointer my-2'>
                <span className= ' text-center  rounded-full'><FaSignOutAlt size = { '20px' }/></span>
                <span>Logout</span>
              </button>
          </div>
        </motion.Card>
    )
}


const Nav = (props) => {
const ctx = useContext(storeAgent)
const userName = useSelector(currentUserSelector)
const trimName = String(userName).substring(0, 5)
  return (
    <div>
      <nav className='flex bg-white top-0 items-center justify-between md:shadow-none w-screen shadow-sm p-2'>
        <div  className='flex gap-2 items-center ml-6 text-lg font-bold'>
          <img className=' w-12' src = {quizicon} alt='icon'/>
          <span>QuizLead</span>
        </div>
        { 
         ctx.media <= '1023' ? <motion.button transition = {{delay: 1}}
          className = 'bg-slate-100 rounded-md font-extrabold border border-dashed border-black mr-4 p-2 text-center'
          onClick = {props.menuToggler}>
          { props.menuDisplayed ? <FaTimes /> : <FaBars /> }
         </motion.button> :
          <div className='flex gap-2 items-center mr-6 text-md font-semibold cursor-pointer' 
            onClick={props.menuToggler}>
            <img className=' w-9 h-9 rounded-full ' src = {user} alt='user' />
            <div className='flex items-center gap-2'>
              <span>{userName}</span>
              <span className=' mx-2'>
                { props.menuDisplayed ? <FaAngleUp /> : <FaAngleDown /> }
              </span>
            </div>
          </div> 
        }
        
      </nav>
      
      </div>
  )
}


export default Nav
