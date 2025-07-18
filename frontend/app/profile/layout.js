import Sidebar from '@/components/Sidebar';

export default function ProfileLayout({ children }) {
  return (
    <div className="flex w-full h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}