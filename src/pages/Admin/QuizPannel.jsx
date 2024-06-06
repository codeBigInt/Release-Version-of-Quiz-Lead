import React, { useContext, useEffect, useState } from 'react';
import { FaPen, FaPenFancy, FaTrash } from 'react-icons/fa';
import Add from './Add';
import Edit from './Edit';
import OverLay from '../../components/UI/OverLay';
import { storeAgent } from '../../store/store';

const QuizPannel = () => {
  const [questions, setQuestions] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState(true)
  const [isDisabled , setIsDisabled] = useState(true)
  const [editedQuestion, setEditedQuestion] = useState(null)
  const { formData } = useContext(storeAgent)
  
  useEffect(() => {
    questions.length >= 1 ? setIsDisabled(false) : setIsDisabled(true)
  }, [questions.length])

  const handleDelete = (id) => {
    setQuestions( prevData => {
      const newArray = [ ...prevData ]
      const updatedArray = newArray.filter( question => id !== question.id )
      console.log(updatedArray);
      return updatedArray
    } )
  }
  
  const displayEdit = (editId) => {
    const questionToEdit = questions.filter(ques => ques.id === editId)
    setEditedQuestion(questionToEdit)
    setSelected(editId)
    setIsEditing(true)
  }
  const closeEditModal = () => {
    setIsEditing(false)
  }
  const content = questions.length >= 1 ? questions.map( que => (
                  <div className='mb-[20px]'>
                      <div className='flex gap-2 text-md items-center'>
                        <span className='font-bold text-lg'>{Number(questions.indexOf(que)) + 1}.</span>
                        <li>{que.question}</li>
                      </div>
                      <li key = { que.id }>
                        {
                          Object.entries(que.choices).map(([index, value]) => (
                            <li key={index} className='p-2 border border-dashed border-slate-500 my-4 rounded-md '>{value}</li>
                          ))
                        }
                        <div className='flex justify-between'>
                            <span className=''>Answer: <span className='font-bold'>{que.correctAnswer}</span></span>
                            <div className=' flex gap-2'>
                              <button onClick = { () => handleDelete(que.id) }
                                className='p-[.4em] border border-slate-500 text-slate-500 text-xs rounded-2xl px-[1em]'>
                                  <FaTrash />
                              </button>
                              <button onClick={() => displayEdit(que.id)}
                                className='p-[.4em] border border-slate-500 text-slate-500 text-xs rounded-2xl px-[1em]'>
                                  <FaPen />
                                </button>
                            </div>
                        </div>
                      </li>
                  </div>

                ) ) : <p className='italic text-xl text-[#564cde] opacity-40'>
                        Splendid!  Type in your Question, Choices and Answer below 📋
                      </p>

      return (
        <div className='w-screen h-screen bg-white overflow-hidden overflow-y-scroll fixed top-[60px] flex flex-col items-center justify-center'>
            <Add setQuestions = { setQuestions }
              questions = { questions }
              />
          <div className='w-full relative mt-[60px] flex flex-col overflow-hidden overflow-y-scroll items-center p-[1em]'>
            <div className='flex mt-[230px] gap-4 w-full flex-col text-sm text-slate p-[1.5em] font-bold'>
              <span >Quiz Title: <span className='font-normal'>{formData.title}</span></span>
              <span >Description: <span className='font-normal'>{formData.description}</span></span>
              <span >Time Allowed: <span className='font-normal'>{`${formData.hours}hrs, ${formData.minutes}minutes, ${formData.seconds}seconds, `}</span></span>
            </div>
            <ul className='w-full flex-1 p-[1em] rounded-xl'>
              {content}
            </ul>
            <div className='z-20'>
              {isEditing && <Edit close = { closeEditModal } 
                setQuestions = {setQuestions} 
                editedQuestion = {editedQuestion} 
                selected = {selected}
                questions = {  questions}
                />}
            </div>
            <button disabled = {isDisabled} className={`${isDisabled ? 'bg-opacity-20' : '' } p-[.75em] font-bold self-start mb-10 rounded-lg bg-[#564cde] lg:w-[30%] w-full text-center text-white text-sm`}>
              Create Quiz
            </button>
          </div>
        </div>
    );
}

export default QuizPannel





