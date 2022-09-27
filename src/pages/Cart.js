import { Typography } from '@material-tailwind/react';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext'

export default function Cart() {
    const { cart } = useContext(ShopContext);

    useEffect(() => {
        console.log(cart);
    }, [cart])

    return (
        <div>
            <Typography className="text-white">You have the following items in your cart:</Typography>
            {cart.map(item => {
                return (
                    <div key={item.product.fields.id}>
                        <Typography className="text-white">{item.product.fields.name}</Typography>
                        <Typography className="text-white">Quantity: {item.quantity}</Typography>
                    </div>
                )
            })}
            <Typography className="text-white"><Link to="/search">Search Page</Link></Typography>
        </div>
    )
}