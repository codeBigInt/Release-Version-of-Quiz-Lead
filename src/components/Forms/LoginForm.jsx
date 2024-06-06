import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useContext, useReducer, useState } from 'react'
import { storeAgent } from '../../store/store'
import facebook from '../Assets/images/facebook.png'
import linkedin from '../Assets/images/linkedin.png'
import google from '../Assets/images/google.png'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './userSlice'
// import { onAuthStateChanged } from 'firebase/auth'


const loginFields = [
    {
        id: 'email',
        type: 'text',
        label: 'Enter email',
        placeholder: 'Registered email'
    },
    {
        id: 'password',
        type: 'password',
        label: 'Enter password',
        placeholder: 'Password',
    }
]
//Creating the login reducer fubction
const loginReducer = (state, action) => {
    if(action.type === 'changed'){
        return {
            ...state, [action.name]: action.value
        }
    }
}

 export const LoginContent = (props) => {
    const [forlgata, setForlgata] = useReducer(loginReducer, {})
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [sucessMessage, setSucessMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const ctx = useContext(storeAgent)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //form change Handler
    const changeHandler = (e) => {
        ctx.setErrorMessage(null)
        ctx.setSucessMessage(null)
        const {name, value} = e.target
        setForlgata({ type: 'changed', value, name})
        console.log(forlgata);
    }
    //initialling signin with firebase
    const loginHandler = async(e) => {
        e.preventDefault()
        //Presetting the loading state when the login function is called initially when the button is first clicked
        setIsLoading(true)

        try {
            const userCredentials = await signInWithEmailAndPassword( auth, forlgata.email, forlgata.password )
            dispatch(setUser({id: userCredentials.user.uid, currentUser: userCredentials.user.email, isAuthenticated: true }))
            ctx.setSucessMessage('Loggedin Suceffully')
            ctx.setErrorMessage(null)
            navigate('app/select-course')
        } catch (error) {
            if(error.code === 'auth/network-request-failed'){
                ctx.setErrorMessage('Check your internet connection')
                ctx.setSucessMessage(null)
            }else{
                ctx.setErrorMessage('Invalid Email or Password')
                ctx.setSucessMessage(null)
            }
        }finally{
            //Eliminating the loading state
            setIsLoading(false)
        }
    }
    
    const resetPasswordHandler = () => {
        navigate('/password-reset')
    }
    
      return (
            <form className="w-full" onSubmit = { loginHandler } >
                <div>
                    {ctx.sucessMessage && <p className='text-green-900 font-semibold italic'>{ctx.sucessMessage}</p>}
                    {ctx.errorMessage && <p className='text-red-900 font-semibold italic'>{ctx.errorMessage}</p>}
                </div>
                {loginFields.map( field => {
                if(field.type === 'password'){
                       return  (
                       <div className="w-full mt-4.5 mb-6">
                            <label className="block text-xs py-2 text-slate-500">{field.label}</label>
                            <div className="border-2 boreder-slate-500 rounded-lg w-full flex items-center">
                            <input name = {field.id}
                            value={ forlgata[field.id] }
                             type = {props.passwordView} 
                             placeholder={field.placeholder}
                             onChange = { changeHandler }
                            style = {{caretWidth: "5px"} }
                            className = {` ${props.passwordView === 'password' ? 'text-lg' : 'text-md'} 
                            w-10/12 placeholder-slate-60o p-2 bg-white outline-none font-semibold text-black `}/>
                                <button 
                                className='w-2/12 text-center flex items-center justify-center p-3.2' 
                                onClick = {(e) => {
                                   e.preventDefault()
                                    props.passwordHandler()
                                    }}>
                                    {props.passwordView === 'password' ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>)
            }else{
                return(
                    <div className="w-full mt-4.5 mb-6">
                        <label className="block text-xs py-2 text-slate-500">{field.label}</label>
                        <input
                        name = {field.id} type = {field.type} 
                        value = { forlgata[field.id] }
                        placeholder = {field.placeholder} 
                        style = {{caretWidth: "5px"}}
                        onChange = { changeHandler}
                        className="border-2 boreder-slate-500 bg-white placeholder-slate-600 text-md rounded-lg p-2 w-full outline-none font-semibold text-black 
                        " />
                    </div>
                )
            }
        })}
                <p onClick = {resetPasswordHandler} 
                className=' py-2 underline text-slate-500 font-bold text-sm'>
                    Forgot Password? 
                    </p>
                <button className = {`${ctx.darkMode ? `${ctx.dark.btn} bg-transparent` : 'bg-[#6b6fe9]'} mb-[30px] lg:w-1/2 w-full text-white rounded-xl p-3 text-md bg-[#6b6fe9]`} >
                { isLoading ? 'Loading...' : 'Login' }
                </button>
                
                <div className='w-9/12 self-center flex lg:mb-5  p-3 items-center flex-wrap'>
                <span className='text-slate-500 block lg:inline-block font-semibold text-xs'>Create account with</span>
                <div className='flex gap-4 items-center px-2'>
                    <button className='bg-[#f3f3f3] lg:my-0 my-3 p-1 rounded-full shadow-2xl'><img className='lg:w-[25px] w-[35px]' src = {facebook} alt = 'icons' /></button>
                    <button className='bg-[#f3f3f3] lg:my-0 my-3 p-1 rounded-full shadow-2xl'><img className='lg:w-[23px] w-[33px]'  src = {linkedin} alt = 'icons' /></button>
                    <button className='bg-[#f3f3f3] lg:my-0 my-3 p-1 rounded-full shadow-2xl'><img className='lg:w-[19px] w-[29px]' src = {google} alt = 'icons' /></button>               
                  </div>
            </div>
            </form>
      )
    }