'use client'
import { useContext, useEffect, useState } from 'react';
import { loginWithEmailPassword, loginWithGoogle } from '../lib/auth';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const AuthForm = ({isOpen,setIsOpen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {user,loading} = useContext(UserContext);
  const [buttonText, setButtonText] = useState('Submit');
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmailPassword(email, password);
      if (loading) {
      setButtonText('Loading...');
      } else {
      setButtonText('Submit');
      }
      return response;
    } catch (err) {
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
  
  const router = useRouter();
    useEffect(() => {
      if(user){
        setIsOpen(false);
        router.push('/profile');
      }
    
    }, [user,loading]);
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4'>
      <form onSubmit={handleEmailPasswordLogin} className='flex flex-col items-center gap-4 w-full max-w-md'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md mb-6'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md mb-6'
        />
        
        <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold' type="submit"
        onClick={handleEmailPasswordLogin} disabled={loading}
        >
            {buttonText}
        </Button>
      </form>
      <button className='flex justify-center items-center' onClick={handleGoogleLogin}>
        <Image
        src={`/google.svg`}
        width={24}
        height={24}
        alt='Google Logo'
        />
        <span className='ml-2 text-gray-700'>Login with Google</span>
      </button>
      <button onClick={() => setIsOpen(false)} className='absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <X className='h-5 w-5 text-gray-700' />
      </button>
    </div>
  );
};

export default AuthForm;
