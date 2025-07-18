'use client'
import React, { useContext, useEffect } from 'react'

import AuthForm from './AuthForm'
import UserContext from '@/contexts/UserContext'

const Modal = ({isOpen,setIsOpen,header,formComponent,lowerComponent}) => {
    
    const {user,loading} = useContext(UserContext);
    useEffect(() => {
        if (user || formComponent === 'AuthForm') {
            return;
        }
        else if(!user && !loading){
            setIsOpen(false);
            return;
        }
    }, [user, setIsOpen]);
  return (
    isOpen && (
        <div className='w-full lg:min-w-screen min-h-screen flex items-center justify-center fixed top-0 left-0 bg-opacity-50 z-50 bg-white/30 backdrop-blur-lg' style={{display: isOpen ? 'flex' : 'none'}} onClick={()=>{setIsOpen(false); return;}} >
            <div className='relative flex flex-col items-center justify-start gap-8 p-4 w-[90%] lg:w-[1000px] h-[450px] bg-white border border-white/40 shadow-lg rounded-xl'
            onClick={(e)=>{
                e.stopPropagation();
                return;
            }}
            >
                <h2 className='w-full text-center text-2xl font-bold mb-4'>{header}</h2>
                <div className='flex flex-col items-center justify-center gap-4 w-full lg:py-10'>
                    {formComponent === 'AuthForm'? (<AuthForm isOpen={isOpen} setIsOpen={setIsOpen}/>) : (formComponent)}
                    {lowerComponent}
                </div>
                
            </div>
        </div>
    )
    
  )
}

export default Modal
