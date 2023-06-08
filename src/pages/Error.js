import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='home-container contact'>
      <h1 style={{color: 'rgb(240, 68, 0)'}}>Something went wrong</h1>
      <p> Please go back to our main page!</p>
      <Link to={`shop_project`} style={{margin: 'auto'}}><button className='cart-btn-dropdown summary error'>Home Page</button></Link>
    </div>
  )
}

export default Error