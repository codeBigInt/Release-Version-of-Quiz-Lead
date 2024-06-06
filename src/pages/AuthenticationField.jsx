import React, { useContext, useState } from 'react'
import SideBar from '../components/Authentication/SideBar'
import { LoginContent} from '../components/Forms/LoginForm'
import { SignUpContent} from '../components/Forms/SignForm'
import { storeAgent } from '../store/store'

const AuthenticationField = () => {
  const [signupDisplayed, setSignupDisplayed] = useState(true)
  const [btnText, setBtnText] = useState('Login')
  const [passwordView, setPasswordView] = useState('password')

  
  const ctx = useContext(storeAgent)
  //Funtion to update the password field type
  const passwordFormHandler = () => {
    passwordView === 'password'? setPasswordView('text') : setPasswordView('password')
}


  return ( 
     <div className='w-[100%]  flex item-center lg:h-screen lg:fixed justify-center '>
      <div className=' lg:flex flex-wrap bg-white w-screen overflow-x-hidden lg:overflow-y-hidden '>
        <SideBar />
        <div className={`w-screen lg:w-1/2 lg:relative lg:h-full lg:overflow-y-scroll ${ctx.darkMode ? `${ctx.dark.bg} ${ctx.dark.textColor}` : 'bg-white'}`}>
        <div className='w-full flex flex-col justify-center '>
            <div className={`flex w-1/1 items-center p-4 justify-end`}>
              <span className='text-slate-500 font-semibold px-2  text-xs lg:text-sm '>Already have an account login?</span>
              <button className={`${ctx.darkMode ? `${ctx.dark.btn} hover:${ctx.dark.btnHover} active:${ctx.dark.btnActive}` : 'border-slate-500 border' }
              bg-transparent px-4 py-1.5 text-xs lg:text-sm  space-x-2  text-slate-400 rounded-2xl`}
              onClick = {() => { 
                signupDisplayed ? setSignupDisplayed(false) : setSignupDisplayed(true)
                signupDisplayed ? setBtnText('SignUp') : setBtnText('Login')
                }}
                >
                  {btnText}
              </button>
            </div>
            <div className={`flex flex-col flex-1 w-9/12 m-t-0.5 item-center self-center  mb-[15px]`}>
              <h1 className='lg:text- text-2xl font-bold leading-loose text-center lg:text-left '>Welcome To QuizLead</h1>
              <p className='text-sm leading-loose text-slate-500 text-center lg:text-left '>Register Your Account</p>
              <div className='w-1/1 mt-5 mb-4'>
                {signupDisplayed ? <SignUpContent login = {setSignupDisplayed} passwordView = {passwordView} passwordHandler = {passwordFormHandler} /> : 
                <LoginContent passwordView = {passwordView}  passwordHandler = {passwordFormHandler} />}
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationField