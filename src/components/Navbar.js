import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
 
export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const { cart } = useContext(ShopContext);
  const [cartTotal, setCartTotal] = useState();
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  // I have to put cartTotal in context...?
  useEffect(() => {
    if (cart.length > 0) {
        let itemTotal = cart.reduce((accum,item) => accum + item.quantity, 0)
        setCartTotal(itemTotal);
    }
}, [cart]);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:justify-end lg:align-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 px-10 font-normal"
      >
        <Link to="/search" className="flex align-center">
          Search
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="mx-auto mt-2 max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 blurred">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="small"
          className="flex-none mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span>Final Fantasy XIV Furniture</span>
        </Typography>
        <div className="hidden flex-auto lg:block">{navList}</div>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="cart">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <span class="inline-flex px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartTotal}</span>
          {/* Gotta put ternary operator here <span>{totalCart}</span> */}
        </div>
      </MobileNav>
    </Navbar>
  );
}