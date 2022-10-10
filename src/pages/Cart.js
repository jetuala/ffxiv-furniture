import { Typography, Card, CardBody, Button } from '@material-tailwind/react';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext'

export default function Cart() {
    const { cart, deleteFromCart, increaseQuantity, decreaseQuantity } = useContext(ShopContext);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        let cartTotal = 0;
        cart.forEach(item => {
            cartTotal += (item.product.fields.priceInGil * item.quantity)
        })
        setTotal(cartTotal);
    }, [cart])

    return (
        (cart.length === 0) ? 
        <div className='flex flex-col'>
                <Typography className="self-center text-white" variant="h4">You currently have nothing in your cart.</Typography> 
                <Typography className="self-center text-white" variant="h4"><Link to="/search">Back to Search Page</Link></Typography>
        </div>
        :
        <div className='flex flex-col'>
            <Typography className="self-center text-white">You have the following items in your cart:</Typography>
            {cart.map(item => {
                return (
                    <div key={item.product.fields.id} className="self-center w-2/3">
                        <Card className="mt-1">
                            <CardBody className="grid grid-cols-5">
                                <img
                                    src={item.product.fields.icon.fields.file.url}
                                    alt={item.product.fields.name}
                                    className=""
                                />
                                <div>
                                    <Typography>{item.product.fields.name}</Typography>
                                </div>
                                <div>
                                    <Typography>Price in gil:</Typography>
                                    <Typography>{item.product.fields.priceInGil}</Typography>
                                </div>
                                <div>
                                    <Button onClick={() => decreaseQuantity(item.product.fields.id)}>-</Button>
                                    <Typography>Quantity: {item.quantity}</Typography>
                                    <Button onClick={() => increaseQuantity(item.product.fields.id)}>+</Button>
                                </div>
                                <div>
                                    <Typography>Total:</Typography>
                                    <Typography>{item.product.fields.priceInGil * item.quantity}</Typography>
                                </div>
                                <div>
                                    <Button onClick={() => deleteFromCart(item.product.fields.id)}>Remove item</Button>
                                </div>
                            </CardBody>
                        </Card>

                    </div>
                )
            })}
            <Card className="self-center w-2/3 mt-1">
                <CardBody className="flex flex-row-reverse">
                    <Typography>Total: {total}</Typography>
                </CardBody>
            </Card>
            <Typography className="self-center text-white"><Link to="/search">Back to Search Page</Link></Typography>
        </div>
    )
}