import { Typography, Card, CardBody, Button } from '@material-tailwind/react';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext'

export default function Cart() {
    const { cart } = useContext(ShopContext);
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
        <div>
            <Typography className="text-white">You currently have nothing in your cart.</Typography> 
            <Typography className="text-white"><Link to="/search">Back to Search Page</Link></Typography>
        </div>
        :
        <div>
            <Typography className="text-white">You have the following items in your cart:</Typography>
            {cart.map(item => {
                return (
                    <div key={item.product.fields.id}>
                        <Card className="w-2/3">
                            <CardBody className="grid grid-cols-5">
                                <img
                                    src={item.product.fields.icon.fields.file.url}
                                    alt="img-blur-shadow"
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
                                    <Button>-</Button>
                                    <Typography>Quantity: {item.quantity}</Typography>
                                    <Button>+</Button>
                                </div>
                                <div>
                                    <Typography>Total:</Typography>
                                    <Typography>{item.product.fields.priceInGil * item.quantity}</Typography>
                                </div>
                            </CardBody>
                        </Card>

                    </div>
                )
            })}
            <Card className="w-2/3">
                <CardBody>
                    <Typography>Total: {total}</Typography>
                </CardBody>
            </Card>
            <Typography className="text-white"><Link to="/search">Back to Search Page</Link></Typography>
        </div>
    )
}