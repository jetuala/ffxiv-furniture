import { Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import ShopContext from '../Context/ShopContext'

export default function Cart() {
    const { cart } = useContext(ShopContext);
    console.log(cart);

    return (
        <div>
            <Typography className="text-white">You have the following items in your cart:</Typography>

            <Typography className="text-white">Number of items in cart: {cart.length}</Typography>
        </div>
    )
}