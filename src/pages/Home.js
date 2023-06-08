import React, {useState} from 'react';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';


const Home = () => {
  const {state,
  productState: {
    byStock, byFastDelivery, sort, byRating, searchQuery
  }} = useGlobalContext();

  console.log(state);



  return (
    <>
    <div className='home-container'>
    <div className='products-container home'>
      <div className='opening-banner'>
        <p className='large-opening'>Your Favourite Shop</p>
        <p className='small-opening'>Check all the latest deals on this website</p>
        <Link to={`/products`} ><button className='opening-btn'>Shop Now !</button></Link>
      </div>
      <div className='double-product-container'>
      {state.products.slice(0,2).map((item, itemIndex) => {
        const {image, id, name} = item;
        

        return <div className='single-featured-product home' key={itemIndex}>
          <Link to={`/product/${id}`} ><img src={image} className='product-img large' alt={name}></img></Link>
        </div>
      })}
      </div>
    </div>
    </div>
    </>
  )
}

export default Home

