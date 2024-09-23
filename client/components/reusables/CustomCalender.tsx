"use client"
import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const CustomCalender = () => {
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    return (
        <DatePicker selected={startDate} showPreviousMonths onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" placeholderText="dd/MM/yyyy" showIcon popperPlacement="top-end" monthsShown={1} monthClassName={(date) => (date.getMonth() === 0 ? "bg-red-500" : "")} className='w-full px-4 py-3 rounded-md' />
    );
}
export default CustomCalender