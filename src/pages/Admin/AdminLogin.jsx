import React, { useState } from 'react'
import quizLogo from '../../components/Assets/images/quizicon.png'
import { eligibleAdmin } from '../../components/Assets/avm'
const AdminLogin = () => {
    const [formData, disPatchFormData] = useState({
        email: null,
        password: null
    })
    //Handle Submitting
    const submitHandler = () => {
        if(formData.email === eligibleAdmin.adminEmail && formData.password === eligibleAdmin.adminPassword){
            
        }else{

        }
    }

  return (
    <div className=' bg-[#f0f0ff] w-screen h-screen overflow-hidden overflow-y-scroll flex flex-col items-center'>
        <div className='w-full flex flex-col items-center p-[1em] mt-[30px]'>
            <img src={quizLogo} alt="logo.png" className='lg:w-[10%] w-[40%]' />
            <h1 className='font-bold text-3xl lg:text-2xl'>Quiz Lead</h1>
            <p className='text-xs p-2 text-center'>Product of Intellectual codeBigInt in Collboration with FCBSS EXCOS 2023/2024</p>
        </div>
        <div className='w-[90%] lg:w-[50%] bg-white p-[1em] rounded-md mt-[20px] mb-[50px] shadow-sm'>
            <h3 className='text-lg font-bold'>Login Admin Dashboard</h3>
            <form className='flex flex-col gap-5 py-[1em]'onSubmit={submitHandler}>
                <label htmlFor="Email" className='text-sm'>Email</label>
                <input type="text" className=' placeholder:text-sm p-[.7em] border-[1px] border-r-[1px] rounded-md border-slate-500 outline-none' placeholder='Enter Admin Email' name='email' onChange={e => disPatchFormData({...formData, [e.target.name]: e.target.value })}/>
                <label htmlFor="Password" className='text-sm'>Password</label>
                <input type="text" className=' placeholder:text-sm p-[.7em] border-[1px] border-r-[1px] rounded-md border-slate-500 outline-none' placeholder='Enter Admin Password' name='password' onChange={e => {
                    disPatchFormData({...formData, [e.target.name]: e.target.value })
                    console.log(formData);
                    }}/>
                <button type="submit" className='self-start bg-[#564cdf] py-[1em] px-[.5em] pr-[25px] text-white text-sm rounded-md'>Go to DashBoard</button>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin
