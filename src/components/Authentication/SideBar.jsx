import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa';
import img1 from '../Assets/images/img1.png'
import img2 from '../Assets/images/img2.png'
import img4 from '../Assets/images/img4.png'
import img5 from '../Assets/images/img5.png'

import icon from '../Assets/images/quizicon.png'
import { storeAgent } from '../../store/store';


const imageArray = [
  {
    id: 2,
    img: img2
  },
  {
    id: 4,
    img: img4
  },
  {
    id: 5,
    img: img5
  },
]

const SideBar = () => {
  const [imageInx, setImageIndx] = useState(0)
  const indexChangeInterval = 5000
  const ctx = useContext(storeAgent)

    useEffect(() => {
        const imageChangeEffect = setInterval(() => {
         setImageIndx((prevImg) => (prevImg + 1) % (imageArray.length)) 
        }, indexChangeInterval)

        //Clearing Effect Life cycle
        return () => clearInterval(imageChangeEffect)

    })

  return (
    <div className={`flex flex-col lg:p-4 ${ctx.darkMode ? ctx.dark.sideBg : 'bg-[#E9E9FE] ' }
        w-[100%] lg:w-1/2  lg:h-screen h-[500px]`}>
          <div className={`flex items-center lg:w-1/2 w-full  text-black z-10 
          ${ctx.darkMode ? ctx.dark.sideBg : 'bg-[#E9E9FE] ' }
          border-b-2 border-slate-50 lg:border-none
          justify-between p-2 lg:p-3 fixed left-0 top-0`}>
          <div className='flex items-center'>
            <img className='w-10 h-10'  src = {icon} alt='icon'/>
            <span className={`font-bold text-lg ${ctx.darkMode ? ctx.dark.textColor : 'text-black'}`}>QuizLead</span>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault()
              ctx.darkModeHandler()
            }}
              className=' flex justify-center items-center bg-[#7f8af0] p-2 text-white border border-[#7f8af0] lg:border-[#7f8af0] text-xs rounded-3xl'>
            <span>{ctx.mode}</span>
            <span className='px-2 py-2'>{ctx.darkMode ? <FaSun /> : <FaMoon />}</span>
          </button>
        </div>
        <div  className='flex flex-1 justify-center w-full h-[500px] overflow-x-hidden overflow-y-hidden'>
          <motion.img src = {imageArray[imageInx].img} 
            initial = {{x: '100vw'}}
            animate = {{x: 0}}
            transition = {{delay: 0.5, type: 'string', stiffness: 150}}
            className='lg:w-10/12 w-10/12  mt-[60px]  h-[350px]' alt='quiz'/>
        </div>
        <div className='w-[100%] p-8 flex items-center pb-4 justify-center h-[100px]'>
          {imageArray.map((index) => (
            <button className={`border-2 border-[#7C89F1] w-4 h-4 rounded-full mt-5 mx-[10px]
              ${index.id === imageArray[imageInx].id ? 'bg-[#7C89F1]': '' }`}>
            </button>
          ))}
        </div>
    </div>
  )
}

export default SideBar