import React, { useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import { useParams, Link } from "react-router-dom";
import Rating from '../components/Rating';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
    const {
    state: {cart}, dispatch, handleFakeOnClick,
  } = useGlobalContext();
    // const [readyCart, setReadyCart] = useState([]);

    const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

    


  return (
    <>
    <div className='cart-site'>
    <div className='cart-container narrow'>
        {cart.map((item, itemIndex) => {
            const {image, id, name, price, inStock, department, fastDelivery, ratings} = item;

            return <div className='single-cart-item' key={itemIndex}>
                <Link to={`/product/${id}`} ><img src={image} alt={name} className='cart-img padding'></img></Link>
                <p className='single-cart-item-info'>{name}</p>
                <p className='single-cart-item-info'>£{price}</p>
                <div className='single-cart-item-info'><Rating rating={ratings} onClick={handleFakeOnClick}/></div>
                <select 
                className='single-cart-item-info qty'
                value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: id,
                          qty: e.target.value,
                        },
                      })
                    }>
                    {[...Array(inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                </select>
                <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        className='single-cart-item-info'
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item,
                          })
                        }
                      />
            </div>
        })}
    </div>
    <div className='sidebar-filter cart'>
        <p className='sidebar-title'>Subtotal {cart.length} items</p>
        <p className='sidebar-title'>Total: £{total}</p>
        <button className='cart-btn-dropdown summary' disabled={cart.length === 0}>Proceed to checkout</button>
    </div>
    </div>
    </>
  )
}

export default Cart


