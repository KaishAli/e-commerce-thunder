import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const cartItems = useSelector(state => state.cart.items);

    const addToCart = () => {
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            dispatch({ type: 'ADD_TO_CART', payload: product });
        } else {
            setOpen(true);
        }
    };

    function handleNavigateProductDes() {
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            dispatch({ type: 'ADD_TO_CART', payload: product });
        }
        navigate("/BuyNow", { state: product });

    }
    function handleClose() {
        setTimeout(() => {
            setOpen(false);
        }, 300);
    }
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="This product is already in the cart!"
            />
            <div className='cantainer-card'>
                <div className="card">
                    <img src={product.images[0]} alt="productStore" className="photoset" />
                    <div className="container ">
                        <h4 className="hname">{product.title}</h4>
                        <p className="pname">${product.price}</p>
                    </div>
                    <div className="">
                        <button className="custom_buttonb" onClick={addToCart}>Add To Cart</button>
                        <button className="custom_buttonb" onClick={handleNavigateProductDes}>Buy</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
