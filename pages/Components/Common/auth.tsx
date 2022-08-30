import { useRouter } from 'next/router';
import React, {useEffect} from 'react';
import { useAuth } from '../../../hooks';

export interface AuthProps {
    children: any;
}
export default function AuthLayout ({children}: AuthProps) {
  const router = useRouter()
  const {profile, firstLoading} = useAuth();
  console.log("🚀 ~ file: auth.tsx ~ line 11 ~ AuthLayout ~ profile", profile)

  useEffect(() => {
    console.log("useEffect", firstLoading, profile);
    if(!firstLoading && !profile){
      router.push('/login');
    }
  }, [router, profile, firstLoading]);

  if(!profile){
    return <div>loading...</div>
  }
  
  return (
    <div>
      {children}
    </div>
  );
}
