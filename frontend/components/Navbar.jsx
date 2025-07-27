"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {LogIn, User } from 'lucide-react'
import Modal from './Modal'
import UserContext from '@/contexts/UserContext'
import { logout } from '@/lib/auth'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import SignupForm from './SignUpForm'
import AuthForm from './AuthForm'


const Navbar = () => {
  const router = useRouter();
  const {user,loading,userLogout} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loginForm,setLoginForm] = useState(true);
  const handleModalToggle = () => {
    setIsOpen(!isOpen);
    
  }
  
  const handleLogout = async () =>{
      try{
        await logout();
        userLogout();

        redirect('/');
      }catch(e){
        console.log(e.message);     
      }
  }
  return (
    <div className='flex w-full min-h-[60px] justify-end items-center bg-white shadow-md py-4 px-8 fixed top-0 z-50 gap-8'>
      
            {user ? (
              <>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-md font-bold" onClick = {()=>{
                  if(user && !loading){
                    router.push('patient/profile');
                  }
                }}>
                  <User className="mr-2 h-5 w-5" />
                  Go to Profile!
                </Button>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-md font-bold"
                onClick={handleLogout}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  LogOut!
                </Button>
                
              </>
            )
              :(
                
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-md font-bold" onClick={() => {router.push('/login')}}>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login / Sign-Up
                </Button>
            
              )
            
            }
    </div>
  )
}

export default Navbar
