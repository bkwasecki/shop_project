import React, {useState, useEffect, useRef} from 'react';
import download from '../download.svg';
import {GoThreeBars} from 'react-icons/go';
import {AiOutlineShoppingCart,AiFillDelete} from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../context';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const {
    state: {cart},dispatch, productDispatch
  } = useGlobalContext()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
 

  const useOnHoverOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mouseover", listener);
      return () => {
        document.removeEventListener("mouseout", listener);
      };
    },
    [ref, handler]
  );
}

  const dropdownRef = useRef(null); // Create a reference for dropdown container
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

  // Function to close dropdown
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu); // Call the hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/products/');
    e.target.reset();
  }

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to={`shop_project`} ><img src={download} alt='logo'></img></Link>
          <div className='cart-logo-container' ref={dropdownRef}>
          <Link to={`/cart/`} className='cart-relative' ><AiOutlineShoppingCart size={28} className='cart-icon' onMouseOver={() => setMenuDropDownOpen(true)}/>
          <p className='cart-badge'>{cart.length}</p></Link> 
           {isMenuDropDownOpen && 
          <div className='dropdown-menu active'>
            {cart.length > 0 ? (
              <>
              {cart.map(prod => (
                <p className='dropdown-single-item' key={prod.id}>
                  <Link to={`/product/${prod.id}`} ><img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      /></Link>
                      <div className="cartItemDetail">
                        <p>{prod.name}</p>
                        <p>£ {prod.price}</p>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                      </p>
              ))}
              <Link to={`/cart/`}>
                <button className='cart-btn-dropdown'>
                  Go to Cart
                </button>
              </Link>
              </>
            ) : (
              <p className='dropdown-single-item empty'>Cart is Empty!</p>
            )}
            </div>
}
            
            </div>
          <button className='nav-toggle' onClick={toggleMenu}>
            <GoThreeBars />
          </button>
        </div>
        <div className={`${showMenu ? 'links-container show-container' :'links-container'}`}>
          <ul className='links'>
            
            <li>
             <Link to={`shop_project`} ><p>home</p></Link> 
            </li>
            <li>
              <Link to={`/products/`} ><p>products</p></Link> 
            </li>
            <li>
              <Link to={`/about/`} ><p>about</p></Link> 
            </li>
            <li>
              <Link to={`/contact/`} ><p>contact</p></Link> 
            </li>
            
          </ul>
          <form onSubmit={handleSubmit}>
        <input 
        className="search" 
        type='search' 
        placeholder='Search...'
        onChange={(e) => {
          productDispatch({
            type: 'FILTER_BY_SEARCH',
            payload: e.target.value,
          })
        }}
         />
        </form>
        </div>
        
        <ul className='social-icons'></ul>
      </div>
    </nav>
  )
}

export default Navbar