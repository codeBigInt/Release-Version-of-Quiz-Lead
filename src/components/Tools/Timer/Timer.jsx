import { useContext } from "react"
import { useState, useEffect } from "react"
import { storeAgent } from "../../../store/store"
import { useNavigate } from "react-router-dom"

const Timer = () => {
  
    const { handleSubmit, time, setTime, actuallAns, fixTimer } = useContext(storeAgent)
    const [danger, setDanger] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const updateTime = setInterval(() => {
            if(time.hours === 0 && time.minutes === 0 && time.seconds === 0){
                clearInterval(updateTime) 
                handleSubmit()
                localStorage.removeItem('timer')
                
                if(actuallAns === null){
                    navigate('/app/submission')
                }
            }else{
                let newTime = {}

                setTime((prevTime) => {
                  newTime = { ...prevTime }
                    if(newTime.seconds > 0){
                        newTime.seconds--
                    }else{
                        if(newTime.minutes > 0){
                            newTime.minutes--
                            newTime.seconds = 59
                        }else{
                            newTime.hours--
                            newTime.minutes = 59
                            newTime.seconds = 59
                        }
                    }
                    const closeToExpiry = (newTime.hours * 3600 ) + (newTime.minutes * 60) + (newTime.seconds)
                    if (closeToExpiry <= 240){
                       setDanger(true) 
                    }else{
                        setDanger(false)
                    }
                    return newTime
                })
                    
                localStorage.setItem('timer', JSON.stringify(time))
            }
        }, 1000)


        return () => clearInterval(updateTime)

    }, 
    [time])


  return (
        <div className='flex flex-col'>
            <p className='text-xs'>Countdown</p>
            <h1 className={`text-xl font-bold ${danger? 'finish' : '' } `}>
                {
                    `${time.hours.toString().padStart(2, '0')} : ${time.minutes.toString().padStart(2, '0')} : ${time.seconds.toString().padStart(2, '0')}`
                }
            </h1>
        </div>
  )
}

export default Timer
