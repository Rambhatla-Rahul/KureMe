'use client';

import Modal from '@/components/Modal';
import NewAppointmentForm from '@/components/NewAppointmentForm';
import axios from 'axios';
import { LoaderCircle, Plus, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import UserContext from '@/contexts/UserContext';
const appointmentsData = [
    
];


const AppointmentsPage = () => {
    const {user,loading} = useContext(UserContext);
    const [spinner,setSpinner] = useState(true);
    const [appointments,setAppointments] = useState(appointmentsData);
    const [details,setDetails] = useState(false);
    const fetchAppointments = async (user,loading) => {
        try {

            const token = await user.getIdToken();
            
            const response = await axios.get('http://localhost:5000/api/appointments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(response.data);
            
            return;
        } catch (err) {
            console.log('Error fetching appointments');
        }
    };
    
    const [isOpen,setIsOpen] = useState(false);
    const toggleModal = ()  =>{
        setIsOpen(!isOpen);
    }
    
    useEffect(()=>{
        if(user){
            setSpinner(true);
           fetchAppointments(user);
           setSpinner(false);
        }
    },[user,appointments])
    if (spinner){
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-lg'>
                    <LoaderCircle className='animate-spin text-gray-600 stroke-3'/>
                </div>
            </div>
        )
    }
  return (
    <div>
        
        {
            isOpen && (
                <div className='flex fixed top-0 left-0 min-w-screen min-h-screen bg-white/30 backdrop-blur-lg shadow-md z-50' onClick={(e)=>{
                    
                    toggleModal();
                }}>
                    <X className='absolute top-0 right-0 z-75 m-2' onClick={()=>toggleModal()}/>    
                    <div className='absolute top-10 x-75 w-full h-screen rounded-xl fade-in'>
                        <NewAppointmentForm appointments={appointments} setAppointments= {setAppointments} setIsOpen={setIsOpen}/>
                    </div>
                </div>
            )
        }
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Appointments</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={()=> toggleModal()}>
            <Plus size={20} className="mr-2" />
            Schedule New
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
            {
                spinner? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-lg'>
                            <LoaderCircle className='animate-spin text-gray-600 stroke-3'/>
                        </div>
                    </div>
                ):
                (<ul className="divide-y divide-gray-200">
                    {appointments.map((appt, index) => (
                        <>
                    <li key={index} className="p-6 flex justify-between items-center hover:bg-gray-50">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{appt.doctor}</p>
                            <p className="text-gray-600">{appt.date} at {appt.time}</p>
                        </div>
                        <div>
                            <span className={`px-3 py-1 text-sm rounded-full ${
                                appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {appt.status}
                            </span>
                        </div>
                        <button className="px-4 py-2 text-sm text-white bg-gray-700 rounded-lg hover:bg-gray-800"
                        onClick={()=> setDetails(!details)}
                        >
                            Details
                        </button>
                    </li>
                    {details && (
                        <div className='w-full h-full flex flex-col transition-all duration-300'>Test</div>
                    )}
                   </>
               ))}
           </ul>)
            }
           
        </div>
        
    </div>
  );
};

export default AppointmentsPage;