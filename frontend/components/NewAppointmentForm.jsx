'use client';

import React, { useContext, useState } from 'react';
import { CalendarDays, Clock, User, ClipboardList, LoaderCircle } from 'lucide-react';
import UserContext from '@/contexts/UserContext';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const NewAppointmentForm = ({appointments,setAppointments,setIsOpen}) => {
  const {user,loading} = useContext(UserContext);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
    status: 'Pending',
  });
  const [loadingSpinner,setLoadingSpinner] = useState(false);
  
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {toast} = useToast();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoadingSpinner(true);
      const response = await createAppointment();
        console.log('Response => ',response);
        if(response){
          setAppointments((prev)=>([
                  ...prev,
                  formData,
              ]));
          setIsOpen(false);
          toast({
            title:'Success',
            description:'New appointment created Succesfully!',
            duration:3000,
            variant: "default",
          })
        }
    }catch(e){
          console.log(e.message);
    }
    setLoadingSpinner(false);
    }
    const createAppointment = async () => {
          try {
              
              const token = await user.getIdToken(); 
              const response = await axios.post('http://localhost:5000/api/appointments', {formData},{
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
              });
              return response?.data;
          } catch (error) {
              console.log(error.message);
              
          }
    }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl fadeIn" onClick={(e)=>{
                        e.stopPropagation();
                        return;
                    }}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Schedule New Appointment</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        
        <div className="flex flex-col">
          <label htmlFor="doctor" className="text-violet-700 font-medium flex items-center gap-2">
            <User className="w-5 h-5 " />
            Choose Doctor
          </label>
          <select
            name="doctor"
            id="doctor"
            className="mt-1 p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a doctor</option>
            <option value="dr-smith">Dr. Smith</option>
            <option value="dr-johnson">Dr. Johnson</option>
            <option value="dr-lee">Dr. Lee</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700 font-medium flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Select Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="mt-1 p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>


        <div className="flex flex-col">
          <label htmlFor="time" className="text-gray-700 font-medium flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Select Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="mt-1 p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="flex flex-col">
          <label htmlFor="reason" className="text-gray-700 font-medium flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Reason for Visit
          </label>
          <textarea
            name="reason"
            id="reason"
            rows="3"
            className="mt-1 p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Describe your symptoms or reason..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loadingSpinner? (<div className='flex w-full items-center justify-center'><LoaderCircle className='animate-spin text-white stroke-3'/> </div>): 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default NewAppointmentForm;
