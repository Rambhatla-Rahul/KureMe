'use client';

import { useContext, useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  User,
  FileText,
  MessageSquare,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import UserContext from '@/contexts/UserContext';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const {user,loading} = useContext(UserContext);
  const handleLogout = async()=>{
    await logout();
  }
  const navItems = [
    { href: '/profile', icon: Home, label: 'Dashboard' },
    { href: '/profile/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/profile/personal-info', icon: User, label: 'Personal Info' },
    { href: '/profile/medical-records', icon: FileText, label: 'Records' },
    { href: '/profile/messages', icon: MessageSquare, label: 'Messages' },
  ];
  const router = useRouter();
  useEffect(()=>{
    if(!loading && !user){
        router.push('/');
    }
  })
  return (
    <aside
      className={`relative flex flex-col h-screen bg-slate-100 text-slate-50 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 h-18 border-b border-slate-800">
        <div className={`flex items-center overflow-hidden transition-all ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
            <svg className="h-8 w-auto text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path></svg>
            <span className="ml-3 text-lg font-semibold text-black">KureMe</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-grow">
        <ul className="py-2">
          {navItems.map((item) => (
            <li key={item.href} className="px-3 py-1">
              <Link href={item.href}>
                <div
                  className={`relative flex items-center p-3 rounded-lg cursor-pointer transition-colors group ${
                    pathname === item.href
                      ? 'bg-blue-500 text-black font-medium'
                      : 'text-slate-400 hover:bg-slate-400 hover:text-gray-800'
                  }`}
                >
                  <item.icon size={22} />
                  <span
                    className={`ml-4 overflow-hidden whitespace-nowrap transition-all ${
                      isExpanded ? 'inline' : 'hidden'
                    }`}
                  >
                    {item.label}
                  </span>
                  {!isExpanded && (
                     <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-slate-800 text-slate-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                        {item.label}
                     </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
          <div className="flex items-center p-2 rounded-lg bg-slate-300">
             <img src={`${user?.photoUrl ? user?.photoUrl:"https://i.pravatar.cc/40?u=a042581f4e29026704d"}`} alt="User Avatar" className="rounded-full" />
             <div className={`ml-3 overflow-hidden transition-all ${isExpanded ? 'inline' : 'hidden'}`}>
                <p className="text-sm font-medium text-black">{user?.displayName}</p>
                <p className="text-xs text-black">View Profile</p>
             </div>
             <button className={`ml-auto p-2 text-black hover:text-slate-100 transition-all ${isExpanded ? 'inline' : 'hidden'}`}
             onClick={()=>handleLogout()}
             >
                <LogOut size={20} />
             </button>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;