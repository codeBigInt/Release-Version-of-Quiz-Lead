import { useContext, useReducer, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import facebook from '../Assets/images/facebook.png'
import linkedin from '../Assets/images/linkedin.png'
import google from '../Assets/images/google.png'
import { setUser } from './userSlice'
import { storeAgent } from '../../store/store';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { onAuthStateChanged } from 'firebase/auth'


const signupFields = [
    {
        id: 'name',
        type: 'text',
        label: 'Enter name',
        placeholder: 'Type your name'
    },
    {
        id: 'email',
        type: 'text',
        label: 'Enter email',
        placeholder: 'Email Address'
    },
    {
        id: 'password',
        type: 'password',
        label: 'Enter password',
        placeholder: 'Password',
    }
]

//initiallinzing form data
const initialForlgata = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
}
const formReducer = (state, action) => {
    //Return new state
    if (action.type === 'changeValue') {
        return {...state, [action.field]: action.value}
    } else return state;
}


export const SignUpContent = (props) => {
    
    const [forlgata, setForlgata] = useReducer(formReducer, initialForlgata)
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [sucessMessage, setSucessMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const ctx = useContext(storeAgent)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formHandler = (e) => {
        //To change form data
        ctx.setErrorMessage(null)
        ctx.setSucessMessage(null)
        const { name, value } = e.target
        setForlgata({ type: 'changeValue', field: name, value })
        console.log(value);
    }
    

   
    //Handling Submit 
    const submitHandler = async(e) => {
        e.preventDefault()
        //Presetting the loading state when the login function is called initially when the button is first clicked
        setIsLoading(true)

        try {
            const userCredentials = await createUserWithEmailAndPassword( auth, forlgata.email, forlgata.password )
            console.log(userCredentials);
            ctx.setSucessMessage('Registration sucessful 🎉, Now Login')
            ctx.setErrorMessage(null)
            props.login(false)
        } catch (error) {
            if(error.code === 'auth/network-request-failed'){
                ctx.setErrorMessage('Check your internet connection')
                ctx.setSucessMessage(null)
            }else{
                ctx.setErrorMessage(error.message)
                ctx.setSucessMessage(null)
            }
        }finally{
            //Eliminating the loading state
            setIsLoading(false)
        }
    }
 
    return (
        <form onSubmit = {submitHandler} >
            <div>
                {ctx.sucessMessage && <p className='text-green-900 font-semibold italic'>{ctx.sucessMessage}</p>}
                {ctx.errorMessage && <p className='text-red-900 font-semibold italic'>{ctx.errorMessage}</p>}
            </div>
            {signupFields.map( field => {
                if(field.type === 'password'){
                       return  (
                       <div className="w-full mt-4.5 mb-6">
                            <label className="block text-xs py-2 text-slate-500" >{field.label}</label>
                            <div className="border-2 boreder-slate-500  rounded-lg w-full flex items-center">
                            <input 
                             name = {field.id}
                             type = {props.passwordView} 
                             value = {forlgata[field.id]}
                             onChange = {formHandler}
                             placeholder={field.placeholder}
                             style = {{caretWidth: "5px"} }
                             className = {` ${props.passwordView === 'password' ? 'text-lg' : 'text-md'} 
                             w-10/12 placeholder-slate-600 p-2 outline-none font-semibold text-black `}
                          />
                                <button 
                                    className='w-2/12 text-center flex items-center justify-center p-2.2 '
                                    onClick = {(e) => {
                                    e.preventDefault()
                                    props.passwordHandler()
                                    }}
                                >
                                    {props.passwordView === 'password' ? <FaEyeSlash /> : <FaEye />  }
                                </button>
                            </div>
                        </div>)
            }else{
                return(
                    <div className="w-full mt-4.5 mb-6">
                        <label className="block text-xs py-2 text-slate-500">{field.label}</label>
                        <input name = {field.id} type = {field.type} value={forlgata[field.id]} placeholder = {field.placeholder} 
                        className="border-2 placeholder-slate-600 boreder-slate-500 text-md rounded-lg p-2 w-full outline-none font-semibold text-black"
                        onChange = {formHandler}/>
                    </div>
                )
            }
        })}
            <button className= {`${ctx.darkMode ? `${ctx.dark.btn} bg-transparent` : 'bg-[#6b6fe9]'} mb-[30px] lg:w-1/2 w-full  text-white rounded-xl p-3 text-md bg-[#6b6fe9]`} >
                { isLoading ? 'Registering Your Account...' : 'SignUp' }
            </button>
            <div className='w-9/12 self-center flex lg:mb-5  p-2 items-center flex-wrap lg:mb-5'>
                <span className='text-slate-500 font-semibold text-sm lg:text-xs my-2 lg:my-0'>Create account with</span>
                <div className='flex gap-4 lg:mx-[20px] items-center lg:px-2 '>
                    <button className='bg-[#f3f3f3] lg:my-0 my-3 p-1 rounded-full shadow-2xl'><img className='lg:w-[25px] w-[35px]' src = {facebook} alt = 'icons' /></button>
                    <button className='bg-[#f3f3f3] lg:my-0 my-3 p-1 rounded-full shadow-2xl'><img className='lg:w-[23px] w-[33px]' src = {linkedin} alt = 'icons' /></button>
                    <button className='bg-[#f3f3f3] lg:my-0 my-3 p-1 rounded-full shadow-2xl'><img className='lg:w-[21px] w-[29px]' src = {google} alt = 'icons' /></button>               
                  </div>
            </div>
            
        </form>

    )
  }
