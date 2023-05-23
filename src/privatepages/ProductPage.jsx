import React from 'react';
import { Route } from 'react-router-dom';
import ActionAreaCard from './ActionAreaCard';
import { Provider } from 'react-redux';
import store from '../store';

const ProductPage = () => {
  return (
    <div>
        <Provider store={store}>
      <ActionAreaCard />
    </Provider>
    </div>
  );
};

export default ProductPage;
