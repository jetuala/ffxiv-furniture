import { useState, useContext } from 'react';
 
// My custom hook

export default function useDialog() {
    const [isShowing, setIsShowing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    function toggle(item) {
        setIsShowing(!isShowing);
        setCurrentItem(item);
    }

    /* Be careful, the order of returned variables/functions has to match */
    return [
        isShowing,
        toggle,
        currentItem
    ]
}