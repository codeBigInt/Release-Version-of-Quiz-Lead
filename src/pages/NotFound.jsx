import React, { useState } from 'react'
import errImg from '../components/Assets/images/error.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../firebaseConfig'
import { setUser } from '../components/Forms/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import Loader from './Loader'

const NotFound = () => {
  const [isLoading , setIslOading] = useState(true)

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  console.log(auth);
  onAuthStateChanged(auth, (user) => {
        if(user){
          dispatch(setUser({currentUser: user.email, isAuthenticated: true }))
        }else{
          dispatch(setUser(null))
        } 
        if(isLoading){
          setIslOading(false)
        }
  })
  


  return (
    <>
      { isLoading && <Loader /> }
      <div className='flex flex-col justify-center items-center my-4'>
        <img className='w-1/2' src = {errImg} alt='Oopps' />
        <div className='w-1/2 flex flex-col items-center'>
          <h2 className='text-3xl text-color font-extrabold text-center'>Page Not Found</h2>
          <div className='my-5'>
              <span>Try checking the URL and Login</span>
              <Link to={'/'}>
                  <button className='mx-3 p-2 rounded-lg bg-[#7f8af0]'>Back To Login</button>
              </Link>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default NotFound
