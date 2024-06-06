import React, { useEffect, useState } from 'react'

const Edit = (props) => {
    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [choices, setChoices] = useState('')


    useEffect(() => {
        props.editedQuestion.map(ques => {
            setCorrectAnswer(ques.correctAnswer.toString())
        })
        props.editedQuestion.map(ques => {
            setQuestion(ques.question.toString())
        })
        props.editedQuestion.map(ques => {
            const values = ques.choices
            const deriveString = Object.values(values)
            setChoices(deriveString.join(','))
        })
    }, [])

    const updateEditedField = (e) => {
        e.preventDefault()
        const index = props.questions.find(ques => ques.id === props.selected)
        if(index){
            index.question = question
            index.correctAnswer = correctAnswer
            const choicesArray = choices.split(',').map(choice => choice.trim());
            // Generate an object for choices
            const choicesObject = {};
            choicesArray.forEach((choice, index) => {
                choicesObject[`option${index + 1}`] = choice;
            });
           index.choices = choicesObject
           props.setQuestions([...props.questions])
           console.log(props.questions);
        }
        props.close()
    }

  return (
    <div className='w-screen h-screen fixed top-0'>
    <div onClick = { () => props.close() } className='w-screen h-screen fixed top-0 bg-black bg-opacity-15 left-0'></div>
    <div className='flex flex-col rounded-md bg-white shadow-lg w-[60%] fixed top-[90px] left-[20%]'>
      <form className='flex flex-col gap-[1em] p-[1.5em]'>
        <textarea placeholder='Question' 
            onChange={e => setQuestion(e.target.value)}
            value={question} 
            className='placeholder:text-xs outline-none border border-slate-500 rounded-md p-[.75em] ' 
            name="" id="" cols="30" rows="3"></textarea>
        <input 
            onChange={e => setChoices(e.target.value)}
            placeholder={`Enter Choices and seperate with comma ' , '`} 
            value={choices} 
            className='placeholder:text-xs outline-none border border-slate-500 rounded-md p-[.75em] ' 
            type="text" />
        <input 
            onChange={e => setCorrectAnswer(e.target.value)}
            placeholder='correct answer' 
            value={correctAnswer} 
            className='placeholder:text-xs outline-none border border-slate-500 rounded-md p-[.75em] ' type="text" />
        <div className='flex justify-center items-center gap-4'>
            <button onClick={(e) => updateEditedField(e)} className='bg-[#564cde] text-white text-sm  w-[45%] p-[.75em] rounded-md font-bold '>Edit</button>
            <button onClick={ (e) => props.close() } className='bg-[#564cde] text-white text-sm  w-[45%] p-[.75em] rounded-md font-bold '>Close</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Edit
