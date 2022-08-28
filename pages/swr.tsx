import * as React from 'react';
import { StudentDetail } from './Components/SWR';


export default function SWRPage () {
  return (
    <div>
      <h1>SWR PageLayout</h1>
      <ul>
        <li><StudentDetail studentId='sktwi1cgkkuif36f3'/></li>
        <li><StudentDetail studentId='sktwi1cgkkuif36f3'/></li>
        <li><StudentDetail studentId='sktwi1cgkkuif36f3'/></li>
      </ul>
    </div>
  );
}
