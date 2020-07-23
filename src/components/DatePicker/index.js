import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';


export default function DatePicker({ name, ...rest }) {
    const datepickerRef = useRef(null);
    const { fieldName, registerField, defaultValue } = useField(name);
    const [selectedDate, setSelectedDate] = useState(defaultValue || null);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: datepickerRef.current,
            path: 'props.selected',
            clearValue: (ref) => {
                ref.clear();
            },
        });
    }, [fieldName, registerField]);
    return (
        <ReactDatePicker
            ref={datepickerRef}
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat='dd/MM/yyyy'
            maxDate={ new Date() }
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
            placeholderText="dd/MM/aaaa"
            className="datepicker"
            {...rest}
        />
    );
};
