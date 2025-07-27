'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import UserContext from '@/contexts/UserContext';
import { signUpWithEmailPassword, loginWithGoogle } from '../lib/auth';
import axios from 'axios';

const SignupForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonText, setButtonText] = useState('Register');
  const [error, setError] = useState('');
  const {user,loading} = useContext(UserContext);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setButtonText('Registering...');
    try {
      const response = await signUpWithEmailPassword(email, password, displayName);
      console.log(response);
      
      if (response) {
        
        const patientInfo = {
          uid: response.uid,
          displayName: response.displayName,
          email: response.email,
          
        }
        await signUp(response, patientInfo);
        toast.success('Account Created Successfully!', {
          className: 'text-sm md:text-base text-green-600 font-medium tracking-wide font-semibold',
          position: 'top-right',
        });
      } else {
        toast.error('Signup Failed', {
          description: 'Please try again later!',
          className: 'text-sm md:text-base text-red-600 font-medium tracking-wide font-semibold',
          position: 'top-right',
        });
      }

      setButtonText('Register');
      return response;
    } catch (err) {
      setButtonText('Register');
      toast.error('Signup Failed', {
        description: err.message,
        className: 'text-sm md:text-base text-red-600 font-medium tracking-wide font-semibold',
        position: 'top-right',
      });
      console.log(err.message);
      
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  const signUp = async (user,patientInfo) => {
    const token = await user.getIdToken();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/patient/register',
        {patientInfo},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }
      );
      if(response){
        toast.success('Account Created Successfully!', {
          className: 'text-sm md:text-base text-green-600 font-medium tracking-wide font-semibold',
          position: 'top-right',
      });
        router.push('/patient/profile');
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if(user){    
      router.push('/patient/profile');
    }
  }, [user]);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <form onSubmit={handleSignup} className='flex flex-col items-center gap-4 w-full max-w-md'>
        <div className='w-full mb-4'>
            <label htmlFor='fullname' className='block text-sm font-medium text-gray-700 mb-1'>
            Full Name
            </label>
            <input
            id='fullname'
            type='text'
            placeholder='Enter your full name'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
            />
        </div>

        <div className='w-full mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
            Email Address
            </label>
            <input
            id='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
            />
        </div>

        <div className='w-full mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
            Password
            </label>
            <input
            id='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            required
            />
        </div>
        <Button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold'
            type='submit'
            disabled={loading}
            onClick={handleSignup}
        >
            {buttonText}
        </Button>
        </form>


      <button className='flex justify-center items-center my-4 hover:cursor-pointer overflow-hidden transition-all duration-300 ease-in-out' onClick={handleGoogleLogin}>
        <Image src={`/google.svg`} width={24} height={24} alt='Google Logo' />
        <span className='ml-2 text-gray-700 google-info'>Sign Up with Google</span>
      </button>
    </div>
  );
};

export default SignupForm;
