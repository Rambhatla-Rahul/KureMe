'use client';

import NewAppointmentForm from '@/components/NewAppointmentForm';
import axios from 'axios';
import { Calendar, FileText, Home, LoaderCircle, MessageSquare, Plus, User, X } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '@/contexts/UserContext';
import gsap from 'gsap';
import Image from 'next/image';

const appointmentsData = [];

const AppointmentsPage = () => {
  const { user, loading } = useContext(UserContext);
  const [spinner, setSpinner] = useState(true);
  const [appointments, setAppointments] = useState(appointmentsData);
  const [expandedIndex, setExpandedIndex] = useState(null); 
  const detailsRefs = useRef([]);

  const fetchAppointments = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      
      setAppointments(response.data);
    } catch (err) {
      console.log('Error fetching appointments');
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user) {
      setSpinner(true);
      fetchAppointments(user).finally(() => setSpinner(false));
    }
  }, [user]);

  const toggleDetails = (index) => {
    if (expandedIndex === index) {
      
      gsap.to(detailsRefs.current[index], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      setExpandedIndex(null);
    } else {
      
      if (expandedIndex !== null && detailsRefs.current[expandedIndex]) {
        gsap.to(detailsRefs.current[expandedIndex], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
      gsap.to(detailsRefs.current[index], {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      setExpandedIndex(index);
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className='flex fixed top-0 left-0 min-w-screen min-h-screen bg-white/30 backdrop-blur-lg shadow-md z-50'
          onClick={toggleModal}
        >
          <X className='absolute top-0 right-0 z-75 m-2' onClick={toggleModal} />
          <div className='absolute top-10 x-75 w-full h-screen rounded-xl fade-in'>
            <NewAppointmentForm
              appointments={appointments}
              setAppointments={setAppointments}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 font-serif">Your Appointments</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg  hover:bg-blue-700 transition-colors"
          onClick={toggleModal}
        >
          <Plus size={20} className="mr-2" />
          <p className='text-nowrap'>Schedule New</p>
        </button>
      </div>

      <div className="bg-white/60 rounded-lg shadow-md font-serif">
        {spinner ? (
          <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-lg'>
              <LoaderCircle className='animate-spin text-gray-600 stroke-3' />
            </div>
          </div>
        ) : (
          <div className='rounded-md'>
            {appointments.map((appt, index) => (
              <div className="bg-transparent+">
              <div key={index} className="p-6 flex flex-col gap-4 mb-2">
                <div className="flex justify-between items-center ">
                  <div className='flex justify-center items-center gap-8'>
                    <div className='min-w-14 min-h-14 rounded-full bg-amber-900 flex justify-center items-center'><span className='text-2xl font-bold text-white'>{appt.doctorId[0].toUpperCase()}</span></div>
                    <p className="text-lg font-semibold text-gray-800">{appt.doctorId}</p>
                    <p className="text-gray-600">{appt.date} at {appt.time}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 text-sm text-white bg-gray-700 rounded-lg hover:bg-gray-800"
                    onClick={() => toggleDetails(index)}
                  >
                    {expandedIndex === index ? 'Hide' : 'Details'}
                  </button>
                </div>

                <div
                  ref={(el) => (detailsRefs.current[index] = el)}
                  className="overflow-hidden opacity-0 h-0"
                >
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <p><strong>Doctor Name: </strong> {appt.doctor || "Doctor"}</p>
                    <p><strong>Reason:</strong> {appt.reason || "Routine Checkup"}</p>
                    <p><strong>Notes:</strong> {appt.notes || "No additional notes."}</p>
                    <div><strong>Uploaded Files: </strong>{appt.uploadedFiles}</div>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default AppointmentsPage;
