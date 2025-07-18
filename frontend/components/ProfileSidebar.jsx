'use client';
import { Sidebar } from '@/components/ui/sidebar';
import UserContext from '@/contexts/UserContext';
import { logout } from '@/lib/auth';
import { Bot, Dock, File, House, LoaderCircle, LogOut, LogsIcon, Menu, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
const sidebarIcons = [
  { name: 'Home', icon: <House/> },
  { name: 'Reports', icon: <File /> },
  { name: 'Logs', icon: <LogsIcon /> },
  {name: 'AI', icon: <Bot />}
];

const ProfileSidebar = () => {
    const [expanded, setExpanded] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  
  return (
    <div className="flex max-w-[200px] min-h-screen items-center justify-center bg-white">
        <Sidebar
            className={`flex flex-col gap-4 rounded-r-lg overflow-hidden bg-white ${
            expanded ? 'min-w-[200px]' : 'min-w-[70px]'
            } shadow-xl border-none justify-evenly items-start transition-all duration-300 ease-in-out`}
        >
            <div
            className="flex flex-col items-center gap-4 py-4 hover:bg-gray-300 hover:animate-pulse"
            onClick={() => setExpanded(!expanded)}
            >
            <Menu />
            </div>
            <div className="flex flex-col h-full items-center gap-8 py-8">
            {sidebarIcons.map((icon, index) => (
                <div
                key={index}
                className={`flex gap-4 p-4 rounded-full hover:cursor-pointer hover:bg-gray-300 hover:animate-pulse ${
                    expanded ? 'w-full' : ''
                }`}
                >
                {icon.icon}
                {expanded && (
                    <span className="flex items-center justify-center font-bold ml-2 text-sm">
                    {icon.name}
                    </span>
                )}
                </div>
            ))}
            </div>
            <div
            className="flex flex-col items-center gap-4 py-4 hover:bg-gray-300 hover:animate-pulse"
            onClick={handleLogout}
            >
            <LogOut />
            </div>
        </Sidebar>
        </div>
  )
}

export default ProfileSidebar
