import React from 'react';
import landing1 from '../images/landing-main.jpg';
import { Typography } from '@material-tailwind/react';

export default function LandingPage() {
    return (
        <div className="flex">
            <div className="flex-auto w-64 mt-4 p-20">
                <img src={landing1} alt="FFXIV Room" />
            </div>
            <div className="flex-auto w-32 mt-4 p-20 rounded">
                <Typography className="p-2 px-10 font-normal text-black bg-gray-300 shadow-xl">
                    <span>A simple site for a hypothetical e-commerce site based on a limited database of furniture from the Final Fantasy XIV video game.</span>
                </Typography>
            </div>
        </div>
    )
}