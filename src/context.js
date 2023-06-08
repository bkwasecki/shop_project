import React, { useState, useContext, useEffect } from 'react';
import {faker} from '@faker-js/faker';
import { useReducer } from 'react';
import { cartReducer, productReducer } from './Reducer';

const AppContext = React.createContext()



const AppProvider = ({ children }) => {


  faker.seed(9);

  const words = ["Electronics", "Garden", "DIY", "Automotive", "Kitchen"]


  const productss = [...Array(100)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({ category: 'business'}),
    inStock: faker.helpers.arrayElement([0,3,5,6,7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1,2,3,4,5]),
    department: words[faker.number.int({
    'min': 0,
    'max': words.length - 1,
})],
    description: faker.commerce.productDescription(),
  }));

  // console.log(productss);

  const [state, dispatch] = useReducer(cartReducer, {
    products: productss,
    cart: []
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    byCategory: "",
  })

  const handleFakeOnClick = () => {
    return;
  }



 return (
    <AppContext.Provider
      value={{ state, dispatch, productState, productDispatch, handleFakeOnClick}}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

