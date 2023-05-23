// src/components/ActionAreaCard.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useQuery } from 'react-query';
import { axiosInstance } from '../network/axiosInstance';

export default function ActionAreaCard() {
  const[productcounts,setProductCounts]=useState([])
  const { data: products, isLoading } = useQuery('productsData', () =>
    axiosInstance.get('products')
  );

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const isAdded = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    const updatedCartItems = [...cartItems, product];
    setProductCounts((prevState) => ({
      ...prevState,
      [product.id]: (prevState[product.id] || 0) + 1,
    }));
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setProductCounts((prevState) => {
      const updatedCounts = { ...prevState };
      delete updatedCounts[productId];
      return updatedCounts;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={4}>
      {products?.data.map((product) => (
        <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
          {!isAdded(product.id) && (
            <Card sx={{ height: '100%' }} style={{ margin: '30px' }}>
              <CardMedia
                component="img"
                image={product.image}
                style={{
                  width: '40%',
                  height: 'auto',
                  margin: '40px auto ',
                }}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {`${product.price}$`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Button
                    style={{
                      color: '#FF6B4C',
                      border: '1px solid #FF6B4C',
                      marginTop: '20px',
                    }}
                    variant="outlined"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                    <AddShoppingCartIcon style={{ marginLeft: '10px' }} />
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          )}
          {isAdded(product.id) && (
            <Card sx={{ height: '100%' }} style={{ margin: '30px' }}>
              <CardMedia
                component="img"
                image={product.image}
                style={{
                  width: '40%',
                  height: 'auto',
                  margin: '40px auto ',
                }}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {`${product.price}$`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Button
                    style={{
                      color: '#FF6B4C',
                      border: '1px solid #FF6B4C',
                      marginTop: '20px',
                    }}
                    variant="outlined"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove from Cart
                    <RemoveShoppingCartIcon
                      style={{ marginLeft: '10px' }}
                    />
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
