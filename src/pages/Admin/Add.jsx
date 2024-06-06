import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const Add = (props) => {
  const [question, setQuestion] = useState('');
    const [choicesString, setChoicesString] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  

//   const handleEdit = (id) => {
//     props.setQuestions( prevData => {
//       const newArray = [ ...prevData ]
//       const targetArray = newArray.filter( question => {
//         if(id === question){

//         }
//       })
//         //Set the input fields to equal the properties of the target array
//         //Modify the add button such that its the update the object
//     } )
//   }

  const handleSubmit = (e) => {
      e.preventDefault();
      // Split and trim choices
      const choicesArray = choicesString.split(',').map(choice => choice.trim());
      // Generate an object for choices
      const choicesObject = {};
      choicesArray.forEach((choice, index) => {
          choicesObject[`option${index + 1}`] = choice;
      });
      // Create the object with the input data
      props.setQuestions( prevData => {
        const id = uuidv4()
        let  newArray = [ ...prevData ]
        const newQuestion = {
            id,
            question: question,
            choices: choicesObject,
            correctAnswer: correctAnswer
        };
        newArray.push(newQuestion)
        console.log(newArray);
        return newArray
      } )
      // onSubmit(newQuestion); // Pass the new object to the parent component
      // Reset form fields
      setQuestion('');
      setChoicesString('');
      setCorrectAnswer('');
  };
  return (
    <div className='z-[5] w-screen p-[1em] flex justify-center items-center top-[60px] fixed bg-white'>
            <form onSubmit={handleSubmit} className='border w-[95%] border-dashed border-slate-500 rounded-lg'>
              <div className='w-full flex flex-col p-[1.5em] gap-[.5em]'>
                <textarea
                  className='border outline-none w-[100%] border-slate-500 rounded-md placeholder:text-sm placeholder:text-slate-500 p-[.7em]' 
                  type="text" placeholder="Question" value={question} rows='2'
                  onChange={(e) => setQuestion(e.target.value)} />
                <div className='flex w-[100%] gap-[.5em] flex-col'>
                  <input 
                    className='w-full border border-slate-500 rounded-md placeholder:text-sm placeholder:text-slate-500 p-[.7em]' 
                    type="text" placeholder="Choices (comma-separated)" value={choicesString} 
                    onChange={(e) => setChoicesString(e.target.value)} />
                  <input 
                    className='border w-full border-slate-500 rounded-md placeholder:text-sm placeholder:text-slate-500 p-[.7em]' 
                    type="text" placeholder="Correct Answer" value={correctAnswer} 
                    onChange={(e) => setCorrectAnswer(e.target.value)} />
                </div>
                <button className='p-[.75em] font-bold rounded-lg bg-[#564cde] lg:w-[30%] w-full text-center text-white text-sm' type="submit">Add Question</button>
              </div>
            </form>
    </div>
  )
}

export default Add
