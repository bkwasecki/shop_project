import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import {AiFillStar} from 'react-icons/ai';
import { useGlobalContext } from '../context';
import Rating from '../components/Rating';

// const singleProduct = 'https://dummyjson.com/products/'

const SingleProduct = () => {
  const {id} = useParams();
  const {state: {cart, products}, dispatch} = useGlobalContext();

  console.log(cart);

//   const [product, setProduct] = useState('');
//   const getsingleProduct = async () => {
//     const result = await fetch(`https://dummyjson.com/products/${id}`).then(res => res.json());
//     const {brand, category, description, images, price, rating, stock, thumbnail, title} = result;
//     const newProduct = {brand, category, description, images, price, rating, stock, thumbnail, title};
//     setProduct(newProduct);
// }
//   useEffect(() => {
//     getsingleProduct();
//   },[])


  const product = products.filter(prod => prod.id === id)

  console.log(product);

  const [{image, name, price, inStock, department, fastDelivery, ratings, description}] = product;

  const handleOnClick = () => {
    return;
  }

  return (
    <> 
    <div className='product-container'>
     
      <div className='product-photo-container'>
         <p className='department'>{department}</p>
        <div className='product-title'>{name}</div>
        <div className='display-flex'><Rating rating={ratings} onClick={handleOnClick}/></div>
        <img src={image} alt={name} className='large-product-img'></img>
      </div>
      <div className='product-details'>
        <p className='description'>{description}</p>
        <p className='price'>£{price}</p>{
            cart.some(p => p.id === id) ? (
              <button className='add-to-cart remove' onClick={() => {
                dispatch({
                  type:'REMOVE_FROM_CART',
                  payload: product[0],
                })
              }}>Remove from cart</button>
            ) : (
              <button className='add-to-cart' disabled={!inStock} onClick={() => {
                dispatch({
                  type:'ADD_TO_CART',
                  payload: product[0],
                })
              }}>{! inStock? "Out of Stock" : "Add to Cart"}</button>
            )
          }
        <div className='brand-stock-grid'>
        {/* <p className='brand'>Brand  </p><p className='brand-span'>{brand}</p> */}
        <p className='brand'>Left </p><p className='brand-span'>{inStock}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleProduct