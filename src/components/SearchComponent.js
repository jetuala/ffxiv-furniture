import React, { useState, useEffect, useContext } from 'react';
import useDialog from '../hooks/useDialog.js';
import {
    Card, CardHeader, CardBody, CardFooter, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Checkbox, Input, Radio
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function SearchComponent() {
    const [furniture, setFurniture] = useState();
    const [sortType, setSortType] = useState("Id");
    const [loading, setLoading] = useState(true);
    const [ isShowing, toggle, currentItem ] = useDialog();
    // Gotta import specific named function here OMG I was so frustrated with this lol
    const { cart, addToCart } = useContext(ShopContext);

    const contentful = require('contentful');
    const client = contentful.createClient({
        space: process.env.REACT_APP_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
      });

    useEffect(() => {
        client.getEntries({content_type: 'ffxivFurniture'}).then(function (entries) {
            setFurniture(entries.items);
            setLoading(false);
        });
    }, []);

    // Nope nope nope. Can't sort by just changing order of original array, gotta change state by returning new array.
    // Don't want to use a reducer for a simple sort function lol

    function sortByName(array) {
        const newArray = [...array]
        newArray.sort((a,b) => (a.fields.name > b.fields.name) ? 1 : ((b.fields.name > a.fields.name) ? -1 : 0))
        setFurniture(newArray);
    }

    function sortByNameReverse(array) {
        const newArray = [...array]
        newArray.sort((a,b) => (a.fields.name < b.fields.name) ? 1 : ((b.fields.name < a.fields.name) ? -1 : 0))
        setFurniture(newArray)
    }

    function sortLeastToMostExpensive(array) {
        const newArray = [...array]
        newArray.sort((a,b) => {
            return (a.fields.priceInGil - b.fields.priceInGil)
        })
        setFurniture(newArray)
    }

    function sortMostToLeastExpensive(array) {
        const newArray = [...array]
        newArray.sort((a,b) => {
            return (b.fields.priceInGil - a.fields.priceInGil)
        })
        setFurniture(newArray)
    }

    return (
        <div>
            <div id="searchbar">
                <Checkbox label="Featured" defaultChecked />
                <Checkbox label="All" />
                <Checkbox label="Bed" />
                <Checkbox label="Table" />
                <Checkbox label="Chair" />
                <Checkbox label="Wall-mounted" />
                <Checkbox label="Rug" />

                <div>
                    <Typography>Sort by...</Typography>
                    <Radio name="sort" value="AtoZ" label="A to Z" onClick={() => sortByName(furniture)}/>
                    <Radio name="sort" value="ZtoA" label="Z to A" onClick={() => sortByNameReverse(furniture)}/>
                    <Radio name="sort" value="lowToHigh" label="Price lowest to highest" onClick={() => sortLeastToMostExpensive(furniture)}/>
                    <Radio name="sort" value="highToLow" label="Price highest to lowest" onClick={() => sortMostToLeastExpensive(furniture)}/>
                </div>
                {/* Argh... gotta sort by price, too :P */}
            </div>
            { (loading) ? <h1>Loading...</h1> : 
                <div className="flex flex-wrap container mx-auto">
                    {furniture.map((item) => {
                        // If item.fields.type equals a type in state??
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
                        <DialogHeader className="flex justify-between">
                            <Typography variant="h2" className="flex-initial">
                                {(currentItem) ? currentItem.fields.name : <></>}
                            </Typography>
                            <div className="">
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Link>
                            </div>
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