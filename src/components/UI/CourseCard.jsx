// import React, { useState } from 'react'
// import { FaCheck, FaCheckCircle } from 'react-icons/fa'

// const CourseCard = (props) => {
//   //initial state for the active course
//   const [ativeSelectedCourse, setActiveSelectedCourse]  = useState([]) 
//   const value = props.value
//   const id = props.id
//   const handleSelectedActiveCourse = (newId, val) => {
//     setActiveSelectedCourse(prev => {
//       const newArray = [...prev]
//       newArray[newId] = val
//       return newArray
//   })
//     console.log(ativeSelectedCourse);
//   }
//   return (
//     <button value = {props.value} onClick = {(e) => {
//         e.preventDefault()
//         handleSelectedActiveCourse(id, value)
//         }} style={{transitionDelay: '.2s', backgroundColor: `${props.color}`}}
//          className='relative hover:scale-[1.05] flex flex-col md:flex-row justify-center items-center cursor-pointer 
//             text-center my-[20px] rounded-t-2xl rounded-b-md text-white flex-wrap px-3 py-7 
//             cusor-pointer  w-[70%] md:w-[20%]'>
//               <div>
//                 {props.icon}
//               </div>
//               <div>
//                 <h3 className='py-3 font-bold'>{props.value}</h3>
//                 <p className='text-xs'>
//                   {props.description}
//                 </p>
//               </div>
//               {
//                 ativeSelectedCourse[id] === value ? <div className= {`m-auto absolute bg-transparent p-4 border rounded-full text-2xl border-white text-white`}>
//                     <FaCheck  />
//                 </div> : ''
//               }
//     </button>
//   )
// }

// export default CourseCard
