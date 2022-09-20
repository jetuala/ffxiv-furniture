import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar'
import SearchComponent from '../components/SearchComponent';

export default function Search() {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <SearchComponent />
        </div>
    )
}