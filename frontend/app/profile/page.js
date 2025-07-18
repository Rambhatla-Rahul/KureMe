'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { Bell, FileText, Calendar, LoaderCircle } from 'lucide-react';
import { useRef, useEffect, useState, useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';


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
    const { user, loading } = useContext(UserContext);
    
    const router = useRouter();
    useEffect(() => {
      if (!loading && !user) {
        router.push('/');
      }
      }, [loading, user]);
    

  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
    
  useEffect(() => {
    const chart = chartRef.current;
    const chartDataConfig = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Clinic Visits',
      data: [4, 3, 5, 1, 6, 5],
      fill: true,
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      tension: 0.6,
      pointBackgroundColor: '#1d4ed8',
    },
  ],
  };
    setChartData(chartDataConfig);
  }, [chartRef]);


  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        backgroundColor: '#1f2937', 
        titleFont: {
            size: 14,
        },
        bodyFont: {
            size: 12,
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
      }
    },
    scales: {
        x: {
            grid: {
                display: false, 
            },
            ticks: {
              color: '#4b5563', 
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: '#e5e7eb', 
                borderDash: [5, 5], 
            },
            ticks: {
              color: '#4b5563', 
            }
        }
    },
    
    animation: {
        duration: 1000,
        easing: 'easeInOutCubic',
        delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default') {
                delay = context.dataIndex * 100 + context.datasetIndex * 100;
            }
            return delay;
        }
    }
  };
  if (loading) return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-lg'>
                <LoaderCircle className='animate-spin text-gray-600 stroke-3'/>
            </div>
        </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName}</h1>
      <p className="mt-1 text-gray-600">Here's a summary of your health profile.</p>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calendar className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointment</h3>
            <p className="text-gray-600">Dr. Smith - July 21, 2025</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <FileText className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">New Lab Results</h3>
            <p className="text-gray-600">Blood Test - View Details</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Bell className="text-yellow-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">Medication Reminder</h3>
            <p className="text-gray-600">Take your prescription at 8:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-[600px]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Clinic Visits (Last 6 Months)</h2>
        <div style={{ height: '200px' }}> 
            <Line ref={chartRef} options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;