'use client'
import { useContext, useEffect, useState } from 'react';
import { loginWithEmailPassword, loginWithGoogle } from '../lib/auth';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import axios from 'axios';


const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {user,loading,setUser} = useContext(UserContext);
  const [buttonText, setButtonText] = useState('Submit');
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginWithEmailPassword(email, password);
      if(response){
        const token = response.getIdToken();
        const res = await axios.post('http://localhost:5000/api/patient/login', {
          email,
          password
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res) {
          setUser(res.data);
        }
        
      }
      if (loading) {
      setButtonText('Loading...');
      } else {
      setButtonText('Submit');
      }
      return response;
    } catch (err) {
      toast.error('Error Logging In',{
          description:'Check if your account is Linked with Google.',
          className: 'text-sm md:text-base text-red-600 font-medium tracking-wide font-semibold',
          position:'top-right',
      });
      setError(err.message);
    }
  };

const handleGoogleLogin = async () => {
  try {
    const response = await loginWithGoogle();
    
    if (response) {
      const token = await response.getIdToken();
      const res = await axios.post('http://localhost:5000/api/patient/loginwithgoogle', {
        patientInfo: response,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res);
      
      if (res) {
        setUser(res.data);
      }
      toast.success('Logged-In Successfully!', {
        className: 'text-sm md:text-base text-green-600 font-medium tracking-wide font-semibold',
        position: 'top-right',
      });
      router.push('/patient/profile');
    }
  } catch (err) {
    setError(err.message);
    console.log(err.message);
  }
};

  const router = useRouter();
    useEffect(() => {
      console.log(user);
      
      if(user){

        router.push('/patient/profile');
      }
    }, [user]);






  return (
    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <form onSubmit={handleEmailPasswordLogin} className='flex flex-col items-center gap-4 w-full max-w-md'>
        <div className='w-full mb-4'>
            <label htmlFor='email' className='block text-md font-bold text-gray-700 mb-1'>
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
            <label htmlFor='password' className='block text-md font-bold text-gray-700 mb-1'>
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
        
        <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold' type="submit"
        onClick={handleEmailPasswordLogin} disabled={loading}
        >
            {buttonText}
        </Button>
      </form>
      <button className='flex justify-center items-center my-4 transition-all duration-300 ease-in-out' onClick={handleGoogleLogin}>
        <Image src={`/google.svg`} width={24} height={24} alt='Google Logo' />
        <span className='ml-2 text-gray-700'>Login with Google</span>
      </button>
    </div>
  );
};

export default AuthForm;
