import React, {useState, useEffect} from 'react';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Rating from '../components/Rating';
import SweetPagination from 'sweetpagination';


// const yourModuleName = require('sweetpagination');

const Products = () => {
  const {
    state: {cart, products}, dispatch, 
    productState: {
    byStock, byFastDelivery, sort, byRating, searchQuery, byCategory
  }, handleFakeOnClick, productDispatch,
  } = useGlobalContext();

  const [currentPageData, setCurrentPageData] = useState(products);

console.log(byStock, byFastDelivery, sort, byRating, searchQuery, byCategory);


  const transformProducts = () =>{
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a,b) => sort === 'lowToHigh'? a.price-b.price : b.price - a.price)
    }
    if(!byStock){
      sortedProducts = sortedProducts.filter(prod => prod.inStock)
    }
    if(byFastDelivery){
      sortedProducts = sortedProducts.filter(prod => prod.fastDelivery)
    }
    if(byRating){
      sortedProducts = sortedProducts.filter(prod => prod.ratings >= byRating)
    }
    if(searchQuery) {
      sortedProducts = sortedProducts.filter(prod => prod.name.toLowerCase().includes(searchQuery))
    }
    if(byCategory === 'All' || byCategory === ''){
    return sortedProducts
    }else{
      sortedProducts = sortedProducts.filter(prod => prod.department === byCategory)
    }
    return sortedProducts;
  }
  // useEffect(() => {
  //   setCurrentPageData(transformProducts());
  // },[])
  

    const categories = products.map(prod => prod.department);

    const uniqueCategories = [... new Set(categories)]

    console.log(uniqueCategories);

  return (
    <>
    <div className='home-container'>
    <Sidebar />
    <div className='prod-cat-container'>
      <div className='categories-container'>
        <p className='category' onClick={(e) => productDispatch({
      type: "FILTER_BY_CATEGORY",
      payload: e.target.innerHTML,
    })}>All</p>
        {uniqueCategories.map((prod, prodIndex) => {
          return <p className='category' key={prodIndex} onClick={(e) => productDispatch({
      type: "FILTER_BY_CATEGORY",
      payload: e.target.innerHTML,
    })}>{prod}</p>
        })}
      </div>
    <div className='products-container prod'>
      {currentPageData.map((item, itemIndex) => {
        // const {image, id, name, price, inStock, department, fastDelivery, ratings} = item;
        

        return <div className='single-featured-product large' key={itemIndex}>
          <Link to={`/product/${item.id}`} ><img src={item.image} className='product-img large prod' alt={item.name}></img></Link>
          <p className='article-name'>{item.name}</p>
          <p className='article-price'>£{item.price}</p>
          {item.fastDelivery ? (
            <p className='article-delivery'>Fast Delivery</p>
          ) : (
            <p className='article-delivery'>3-4 working days delivery</p>
          )}
          <p className='article-department'>{item.department}</p>
          <Rating rating={item.ratings} onClick={handleFakeOnClick} /><br />
          {
            cart.some(p => p.id === item.id) ? (
              <button className='cart-btn remove' onClick={() => {
                dispatch({
                  type:'REMOVE_FROM_CART',
                  payload: item,
                })
              }}>Remove from cart</button>
            ) : (
              <button className='cart-btn' disabled={!item.inStock} onClick={() => {
                dispatch({
                  type:'ADD_TO_CART',
                  payload: item,
                })
              }}>{! item.inStock? "Out of Stock" : "Add to Cart"}</button>
            )
          }
          
          
        </div>
      })}
      <SweetPagination
        currentPageData={setCurrentPageData}
        getData={transformProducts()}
        dataPerPage={9}
        navigation={true}
        getStyle={'style-1'}
      />
    </div>
    </div>
    </div>
    </>
  )
}

export default Products