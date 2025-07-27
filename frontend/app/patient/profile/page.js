'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { Bell, FileText, Calendar, LoaderCircle, ArrowDown, ArrowDownIcon, ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState, useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import { DropdownMenu, Menubar } from 'radix-ui';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const createGradient = (ctx, area) => {
    const colorStart = '#3b82f6'; 
    const colorEnd = '#93c5fd'; 
    
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    
    return gradient;
}

const HomePage = () => {
    const { user, loading} = useContext(UserContext);
    const [patient,setPatient] = useState(null);
    const [profileExpanded, setprofileExpanded] = useState(false);
    const router = useRouter();
    useEffect(() => {
      if (!loading && !user) {
        router.push('/');
      }
      
      }, [loading, user]);

  useEffect(() => {
    if (!user && !loading){
      router.push('/');
      
  };
  const fetchAndSetPatientDetails = async () => {
    
    try {
      const token = await user.getIdToken();
      const response = await axios.get('http://localhost:5000/api/patient/details', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setPatient(null);
    }
  };

  fetchAndSetPatientDetails();
}, [user,loading]);
  useEffect(() => {
    // Only run on client
    console.log(user);
    
    if (typeof window === 'undefined') return;

    // getPatientDetails();
  }, [user]);


  return (
    <div className='flex flex-col lg:flex-row gap-6  p-4 rounded-lg h-full'>
      <div className={`w-full overflow-hidden ${profileExpanded ? 'h-full': 'h-80'} lg:w-1/3 bg-white p-6 rounded-lg shadow-md items-center flex flex-col relative transition-all duration-300 ease-in-out`}>
        <h2 className='text-2xl font-semibold font-serif leading-tight mb-4 text-center'>Patient Profile</h2>
        {loading ? (
          <div className='flex items-center justify-center h-full'>
            <LoaderCircle className='animate-spin' size={24} />
          </div>
        ) : patient ? (
          <div className='flex flex-col items-center w-full gap-10 max-h-[40%] p-4'>
            <div className='flex w-32 h-32 bg-black/20 rounded-full p-2'>
              <div className='w-full h-full rounded-full'>
                <Image
                  src={patient.photoURL || '/test_image_profile.jpg'}
                  alt='patient Avatar'
                  width={128}
                  height={128}
                  className='w-full h-full rounded-full object-cover'
                />
              </div>
            </div>
            <div className='flex flex-col w-full mx-4 bg-slate-200/10 rounded-2xl px-4 py-2 shadow-sm justify-between'>
              <span className='font-light'><strong className='font-semibold'>Name: </strong>{patient?.displayName || "-"}</span>
            </div>
            <div className='flex flex-col w-full mx-4 bg-slate-200/10 rounded-2xl px-4 py-2 shadow-sm justify-between'>
              <span className='font-light'><strong className='font-semibold'>Email: </strong>{patient?.email || "-"}</span>
            </div>
            <div className='flex flex-col w-full mx-4 bg-slate-200/10 rounded-2xl px-4 py-2 shadow-sm justify-between'>
              <span className='font-light'><strong className='font-semibold'>Phone No.: </strong>{patient?.phoneNumber || "-"}</span>
            </div>
          </div>
        ) : (
          <p>No patient data available.</p>
        )}
        <div className={`flex flex-col items-center justify-center p-2 rounded-full bg-gray-400/10 backdrop:blur-2xl shadow-lg w-8 h-8 absolute top-4 right-0 ${profileExpanded ? 'translate-x-[-50%] rotate-180' : 'translate-x-[-50%]'} transition-transform duration-300 ease-in-out cursor-pointer`}
        onClick={() => setprofileExpanded(!profileExpanded)}
        >
          <ChevronDown className='text-blue-500 font-bold' size={26} />
        </div>
        
      </div>

      <div className='flex flex-col w-full'>
        <div className='w-full bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4 font-serif'>Health Metrics</h2>

      </div>
      </div>
    </div>
    
  );
};

export default HomePage;