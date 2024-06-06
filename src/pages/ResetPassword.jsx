import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import forgot from '../components/Assets/images/forgot.png'
import { auth } from '../firebaseConfig'
import { sendPasswordResetEmail } from 'firebase/auth'


const ResetPassword = () => {
    const [regEmail, setRegisteredEmail] = useState('')
    const [error, setError] = useState('')
    const [sucess, setSucess] = useState('')

    //Handling form input
    function handleChange(e){
        setRegisteredEmail(e.target.value)
        console.log(regEmail);
    }

    //Sending reset Reques
    const passwordResetRequest = async(e) => {
        e.preventDefault()
        sendPasswordResetEmail( auth, regEmail )
        .then((user) => {
            console.log(user);
            setSucess('Email sent sucessfully, Check your inbox')
        })
        .catch((error) => {
            console.log(error)
            setError(error.message)
        })
    }

  return (
    <div className='flex flex-col justify-center items-center mt-5 w-screen lg:h-screen lg:overflow-y-scroll'>
        { 
        sucess && <p 
            className='self-center border p-2 text-sm rounded-lg text-center 
            text-green border-[#6b6fe9] w-[80%] lg:w-[40%]'>
            { sucess }
        </p> 
        }
        { 
        error && <p 
            className='self-center border p-2 text-sm rounded-lg text-center 
            text-red border-[#6b6fe9] w-[80%] lg:w-[40%]'>
            { error }
        </p> 
        }
        <img className='w-1/6 my-4' src = {forgot} alt='Forgot PassWord'/>
        <h1 className='text-2xl font-bold text-center text-[#6b6fe9]'>Reset Password</h1>
        <form className='flex flex-col shadow-[px -1px 15px rgba(0, 0, 0, 0.3)] w-[80%] lg:w-[50%] outline-none
         rounded-lg p-4 bg-white'
         onSubmit = {passwordResetRequest}>
            <div className='flex flex-col gap-5 '>
                <input onChange = {handleChange} type='email' value = {regEmail} placeholder='enter your email'
                    className='border border-black p-2 rounded-lg'/>
            </div>
            <button className='bg-[#6b6fe9] w-[70%] self-center my-3 p-2 rounded-lg text-white text-sm'>Request Reset</button>
        </form>
        
        
        <Link className='text-slate-500 text-xs underline py-2 font-bold' to = {'/'} >Back To Login</Link>
    </div>
  )
}

export default ResetPassword
