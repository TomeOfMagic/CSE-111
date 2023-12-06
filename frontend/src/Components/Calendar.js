import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BasicDateCalendar() {
  return (
    <div className=' p-2 '>
        <div className=' flex items-center space-x-5'>
            <div className="w-max rounded-lg bg-sky-600 px-5 py-4 shadow-md text-white">
                <FontAwesomeIcon icon={faCalendar} />
            </div>
            <h2 className=' text-xl'>Calendar</h2>
        </div>
        <div className=''>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
        </div>
    </div>
  );
}