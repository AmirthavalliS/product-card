import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from "react-router-dom";

export default function Home() {


    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

      const { cartItems } = useSelector((state) => state.cart);
     const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <section className='productlist-section-one'>
                 
                <div className='container'>
                    <div className='d-flex justify-content-between align-items-center pt-5'>
                     <h2>Products List</h2>
                     <Link to="/cart"> <button className='btn btn-primary'>View Cart {totalQuantity}</button></Link>
                 </div>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                         {products.map((product) => (
                        <div className='col pt-4'>
                            
                            <div class="card h-100 p-3" >
                                <img src={product.image} alt={product.title} className='product-img' />
                                <div class="card-body">
                                    <h5 class="card-title">{product.title}</h5>
                                    <p class="card-text">₹{product.price}</p>
                                    <button onClick={() => dispatch(addToCart(product))} class="btn  btn-primary">Add to Cart</button>
                                </div>
                            </div>
                           
                        </div>
                          ))}
                    </div>

                </div>

            </section>
        </>
       
    )
}
