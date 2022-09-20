import React, { useState, useEffect, useContext } from 'react';
import useDialog from '../hooks/useDialog.js';
import {
    Card, CardHeader, CardBody, CardFooter, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter
  } from "@material-tailwind/react";
import ShopContext from '../Context/ShopContext.js';

export default function SearchComponent() {
    const [furniture, setFurniture] = useState();
    const [loading, setLoading] = useState(true);
    const [ isShowing, toggle, currentItem ] = useDialog();
    // Gotta import specific named function here OMG I was so frustrated with this lol
    const { addToCart } = useContext(ShopContext);

    const contentful = require('contentful');
    const client = contentful.createClient({
        space: process.env.REACT_APP_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
      });

    useEffect(() => {
        client.getEntries({content_type: 'ffxivFurniture'}).then(function (entries) {
            setFurniture(entries.items);
            setLoading(false);
            console.log(entries.items);
        });
    }, []);
    
    return (
        <div>
            { (loading) ? <h1>Loading...</h1> : 
                <div className="flex flex-wrap container mx-auto">
                    {furniture.map((item) => {
                        return (
                            <div className="w-1/3 px-10" key={item.fields.id}>
                                <Card className="m-10 mx-auto" key={item.fields.id}>
                                    <CardHeader color="brown" className="relative h-56">
                                        <img
                                        src={item.fields.image.fields.file.url}
                                        alt="img-blur-shadow"
                                        className="h-full w-full"
                                        />
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <Typography variant="h5" className="mb-2">
                                        {item.fields.name}
                                        </Typography>
                                    </CardBody>
                                    <CardFooter divider className="flex items-center justify-between py-3">
                                        <Typography variant="small">Price in Gil: {item.fields.priceInGil}</Typography>
                                        <Button onClick={() => toggle(item)} variant="gradient">
                                            Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        )
                    })}

                    {/* Dialog box lags fiercely when mapped for each furniture item, gotta handle it in state */}
                    <Dialog open={isShowing} handler={toggle}>
                        <DialogHeader>
                            <Typography variant="h2">
                                {(currentItem) ? currentItem.fields.name : <></>}
                            </Typography>
                        </DialogHeader>
                        <DialogBody divider>
                            <Typography>
                            Type: {(currentItem) ? currentItem.fields.type : <></>}
                            </Typography>
                        </DialogBody>
                        <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => toggle()}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={() => addToCart(currentItem)}>
                            {/* be careful here, onClick only takes mouseevent as parameter. Pass data through argument only */}
                            <span>Add to Cart</span>
                        </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
            }
        </div>
    )
}