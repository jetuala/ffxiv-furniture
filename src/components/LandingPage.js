import React from 'react';
import landing1 from '../images/landing-main.jpg';
import { Typography } from '@material-tailwind/react';

export default function LandingPage() {
    return (
        <div className="flex">
            <div className="flex-auto w-64 mt-4 p-10">
                <img src={landing1} alt="FFXIV Room" />
            </div>
            <div className="flex-auto w-32 mt-4 p-10 rounded">
                <Typography variant="paragraph" className="p-2 px-10 font-normal text-black bg-gray-300 shadow-xl">
                    A simple site for a hypothetical e-commerce site based on a limited database of furniture from the Final Fantasy XIV video game.<br/>
                    I learned a ton on this little project! For example:
                        <ol class="list-decimal list-inside">
                            <li>When to use React State vs. Context</li>
                            <li>The useEffect hook! What a handy little thing!</li>
                            <li>React custom hooks, such as when using a custom dialog window</li>
                            <li>React reducers! To be honest, they always turn out to be less complex than I initially make them out to be!</li>
                            <li>Styling with Tailwind and Material-Tailwind components</li>
                        </ol>
                </Typography>
            </div>
        </div>
    )
}