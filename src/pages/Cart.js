import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const handleBuyClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <section className='cart-section'>
                <div className='container'>
                    <div className='pt-5'>
                        <h2>Cart items</h2>
                    </div>
                    {cartItems.length === 0 ? (
                        <div className='row row-cols-1 '>
                            <div className='col '>
                                <h5>cart is empty</h5>
                            </div>

                        </div>

                    ) : (
                        <>
                            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                                {cartItems.map((item) => (
                                    <div key={item.id} className='col'>
                                        <div className="card h-100">
                                            <img src={item.image} alt={item.title} className='product-img' />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text">₹{item.price} x {item.quantity}</p>

                                                <div className="d-flex justify-content-between">
                                                    <button onClick={() => dispatch(removeFromCart(item.id))} className="btn btn-danger">Remove</button>
                                                    <button className="btn btn-success" onClick={handleBuyClick}>Buy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => dispatch(clearCart())} className='btn btn-primary mt-5'>Clear Cart</button>
                        </>
                    )}
                </div>

            </section>
            <section className='buy-modal-section'>
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Order Confirmation</h5>
                                    <button type="button" className="btn-close" onClick={handleClose}></button>
                                </div>

                                <div className="modal-body">
                                    <p>Thank you for your purchase!</p>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                    <button type="button" className="btn btn-primary">Continue Shopping</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </section>
</>
       
    );
};

export default Cart;
