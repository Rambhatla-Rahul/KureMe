import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';
import { LoaderCircle } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-lg'>
          <LoaderCircle className='animate-spin text-gray-600 stroke-3'/>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;