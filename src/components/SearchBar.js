import React, {useState, useEffect} from 'react';
import { Select, Option, Input } from '@material-tailwind/react'

    // Drop down menu for type
    // Slider for price
    // Text box for name

export default function SearchBar() {
    return (
        <div>
            <Select label="Select type">
                <Option>All</Option>
                <Option>Bed</Option>
                <Option>Table</Option>
                <Option>Chair</Option>
                <Option>Wall-mounted</Option>
                <Option>Rug</Option>
            </Select>
            <Input label="Filter names..." />
        </div>
    )
}