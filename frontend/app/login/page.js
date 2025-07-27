'use client'
import AuthForm from '@/components/AuthForm'
import SignupForm from '@/components/SignUpForm';
import { useState } from 'react'

const page = () => {
    const [userLogin,setUserLogin] = useState(true);
  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center bg-gray-100 overflow-hidden'>
        <div className='lg:visible w-full'>
            <div className="relative animate-fade-in">
            <div className="w-full h-96 lg:h-screen bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center shadow-2xl">
              <div className="text-center text-blue-700">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM9 9V6h2v3h3v2h-3v3H9v-3H6V9h3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Medical Excellence</h3>
                <p className="text-lg opacity-80">Trusted Healthcare Since 1998</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white p-8 shadow-md w-full lg:max-w-[60%] h-full flex flex-col items-center justify-center animate-fade-in'>
            {
                userLogin && (
                    <>
                    <h1 className='text-center w-full font-bold text-3xl my-6'>Login to <span className='text-blue-700 font-extrabold'>Kure</span><span className='text-blue-600'>Me</span></h1>
                    <AuthForm/>
                    <div className='cursor-pointer hover:underline'>
                        <p className='text-sm text-gray-600 mt-4' onClick={() => setUserLogin(!userLogin)}>
                            Don't have an account? 
                            <span 
                                className='text-blue-600 ml-1'
                                
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>
                    </>
                )
            }
            {
                !userLogin && (
                    <>
                    <h1 className='text-center w-full font-bold text-3xl my-6'>Sign-Up for <span className='text-blue-700 font-extrabold'>Kure</span><span className='text-blue-600'>Me</span></h1>
                    <SignupForm/>
                    <div className='cursor-pointer hover:underline'>
                        <p className='text-sm text-gray-600 mt-4' onClick={() => setUserLogin(!userLogin)}>
                            Already have an account? 
                            <span 
                                className='text-blue-600 ml-1'
                                
                            >
                                Login
                            </span>
                        </p>
                    </div>
                    </>
                )
            }
        </div>
      
    </div>
  )
}

export default page
