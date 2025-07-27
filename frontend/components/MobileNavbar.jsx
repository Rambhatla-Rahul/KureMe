'use client';
import UserContext from '@/contexts/UserContext';
import { logout } from '@/lib/auth';
import {
  Home,
  User,
  Settings,
  Calendar,
  FileText,
  MessageSquare,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function MobileNavbar() {
  const pathname = usePathname();
  const { user, loading,userLogout } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    await logout();
    userLogout();
  };

  const navItems = [
    { href: 'profile', icon: Home, label: 'Dashboard' },
    { href: 'appointments', icon: Calendar, label: 'Appointments' },
    { href: 'patient/profile/personal-info', icon: User, label: 'Personal Info' },
    { href: 'patient/profile/medical-records', icon: FileText, label: 'Records' },
    { href: 'patient/profile/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/', icon: LogOut, label: 'Logout' }
  ];

  return (
    <div className="fixed max-w-[700px] bottom-4 left-0 right-0 mx-auto rounded-full bg-gray-600/10 lg:bg-white/50 backdrop-blur-md shadow-lg flex justify-center py-3 z-50">
      <ul className="flex gap-4 lg:gap-6 text-black">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                onClick={() => {
                  if (item.label === 'Logout') handleLogout();
                }}
                className={`flex items-center justify-center p-3 rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'bg-gray-500/30 text-black'
                    : 'hover:bg-slate-400/30 text-'
                }`}
              >
                <item.icon size={20} />
              </Link>

              {/* Tooltip-style label shown on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[-36px] bg-white text-black text-xs font-medium rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none">
                {item.label}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
