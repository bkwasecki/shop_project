import React, {useState} from 'react';
import Rating from './Rating';
import { useGlobalContext } from '../context';

const Sidebar = () => {

  const { productState: {
    byStock, byFastDelivery, sort, byRating, searchQuery
  }, productDispatch} = useGlobalContext();

  

  return (
    <div className='sidebar-filter'>
    <p className='sidebar-title'>
        Filter Products
    </p>
    <form className='filters'>
    <input type="radio" id="inline-1" name="group1" value="Ascending" onChange={() => productDispatch({
      type: "SORT_BY_PRICE",
      payload: "lowToHigh"
    })}
    checked={sort === 'lowToHigh' ? true: false}/>
   <label htmlFor="inline-1">Ascending</label><br/>
   <input type="radio" id="inline-2" name="group1" value="Descending" onChange={() => productDispatch({
      type: "SORT_BY_PRICE",
      payload: "highToLow"
    })}
    checked={sort === 'highToLow' ? true: false}/>
   <label htmlFor="inline-2">Descending</label><br />
   <input type="checkbox" id="inline-3" name="group1" value="Include out of stock" onChange={() => productDispatch({
      type: "FILTER_BY_STOCK",
    })}
    checked={byStock}/>
    <label htmlFor="inline-3">Include Out Of Stock</label><br/>
    <input type="checkbox" id="inline-4" name="group1" value="Fast Delivery Only" onChange={() => productDispatch({
      type: "FILTER_BY_DELIVERY",
    })}
    checked={byFastDelivery}/>
    <label htmlFor="inline-4">Fast Delivery Only</label><br/>
    <div className='rating-div'>
    <label id='rating'>Rating:</label>
    <span className='rating-span'>
    <Rating rating={byRating} onClick={(i) => productDispatch({
      type: "FILTER_BY_RATING",
      payload: i+1,
    })}
     style={{cursor: 'pointer'}}/>
    </span>
    </div>
    </form>

    <button className='clear-filter-btn' onClick={() => productDispatch({
      type: "CLEAR_FILTERS"
    })}>Clear Filters</button>
        
    </div>
  )
}

export default Sidebar