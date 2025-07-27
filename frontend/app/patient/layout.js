'use client'
import MobileNavbar from '@/components/MobileNavbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfileLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex w-full h-screen bg-gradient-to-br from-blue-200 to-blue-300 to-100%">
        <MobileNavbar/>
        
        <main className="flex-1 p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}