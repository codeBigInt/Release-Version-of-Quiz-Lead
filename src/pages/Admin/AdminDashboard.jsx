import React, { useState } from 'react'
import Nav from '../../components/UI/Nav'
import {  DropDown } from '../../components/UI/Nav'
import { FaCross, FaPlus, FaPlusCircle } from 'react-icons/fa'
import QuizDetails from './QuizDetails'
import OverLay from '../../components/UI/OverLay'
import QuizPannel from './QuizPannel'

const dummyData = [
    {
        title: 'BIOL111',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
    },
    {
      title: 'BIOL113',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
    },
    {
        title: 'BIOL112',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
    },
    {
      title: 'BIOL112',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
  },
  {
    title: 'BIOL112',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
},
{
  title: 'BIOL112',
  desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
},
{
  title: 'BIOL112',
  desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
}
]

const AdminDashboard = () => {
    const [menuDisplayed, setMenuDisplayed] = useState(false)
    const [postData, setPostData] = useState({})
    const [modalIsDisplayed, setModalIsDisplayed] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const menuToggler = () => {
    menuDisplayed === false ? setMenuDisplayed(true) : setMenuDisplayed(false)
    }

      function displayAddForm() {
        modalIsDisplayed === false ? setModalIsDisplayed(true) : setModalIsDisplayed(false)
      }


  return (
    <div className='bg-[#f0f0ff] w-screen h-screen overflow-y-scroll'>
       <header className='fixed lg:w-[100%] z-40 shadow-sm'>
            <Nav menuDisplayed = {menuDisplayed} menuToggler = {menuToggler} />
       </header>
       <div className='relative'>
              { menuDisplayed && <DropDown menuToggler = {menuToggler} /> }
        </div>
      <main className='p-[2em] pt-[100px] gap-4 flex  flex-col'>
        <h3 className='text-2xl'>DashBoard</h3>
        <h4 className='text-sm'>Welcome Back, Admin</h4>
        <section className='bg-white flex-wrap justify-center flex gap-8 w-full p-[2em] rounded-lg min-h-[400px] overflow-hidden overflow-y-scroll'>
            <button onClick={displayAddForm} className='fixed p-[1em] right-[3%] bottom-0'>
                  <div className=' bg-white shadow-2xl text-[#564cde] p-[1em] flex border border-slate-200 justify-center items-center text-2xl font-extrabold rounded-full'>
                    <FaPlus />
                  </div>
            </button>
            {
              dummyData.map((addedQuiz) => (
                <button 
                  className='text-left bg-[#f0f0ff] shadow-sm flex bg-opacity-15 p-4 border-2 border-slate-200 lg:w-[25%] max-h-52 min-h-52 rounded-lg'>
                  <div className=' opacity-100 flex flex-col self-end'>
                    <h3 className='text-xl font-bold'>{addedQuiz.title}</h3>
                    <p className='text-xs'>{addedQuiz.desc}</p>
                  </div>
                </button>
              ))
            }
        </section>
      </main>
      <div>
        {modalIsDisplayed && <OverLay closeModal = { setModalIsDisplayed } />}
        {modalIsDisplayed && <QuizDetails setIsAdding = {setIsAdding} closeModal = { setModalIsDisplayed } />}
        {isAdding && <QuizPannel  />}
        
      </div>
    </div>
  )
}

export default AdminDashboard
