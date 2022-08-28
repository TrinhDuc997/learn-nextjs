import * as React from 'react';
import useSWR from 'swr';

export interface IStudentDetailProps {
    studentId: string;
}

export default function StudentDetail ({studentId}: IStudentDetailProps) {
    const {data, error, mutate, isValidating} = useSWR(`/students/${studentId}`,{
        revalidateOnFocus: false,
        
    })
  return (
    <div>
      Name: {data?.name || '--'}
    </div>
  );
}
