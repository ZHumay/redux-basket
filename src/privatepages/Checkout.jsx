import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "@mui/material/Card";
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import { Grid } from "@mui/material";
import { removeFromCart,addToCart } from '../actions/cartActions';

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [productCounts, setProductCounts] = useState({});

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
  
  

  const handleIncrementCount = (productId) => {
    setProductCounts((prevState) => ({
      ...prevState,
      [productId]: (prevState[productId] || 0) + 1,
    }));
  };

  const handleDecrementCount = (productId) => {
    setProductCounts((prevState) => {
      const currentCount = prevState[productId] || 0;
      const updatedCount = currentCount - 1;
      const newCount = updatedCount >= 0 ? updatedCount : 0;
  
      return {
        ...prevState,
        [productId]: newCount,
      };
    });
  };

  const handleRemoveFromBasket = (productId) => {
    dispatch(removeFromCart(productId));
    setProductCounts((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[productId];
      return updatedState;
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const count = productCounts[item.id] || 0;
      totalPrice += item.price * count;
    });
    return totalPrice;
  };

  return (
    <>
      <Grid container spacing={4}>
        {cartItems.map((item) => (
          <Grid key={item.id} item xs={6} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%" }} style={{ margin: "30px" }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                style={{ width: "40%",margin: "40px auto " ,height:"auto"}}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {`${item.price}$`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {item.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => handleIncrementCount(item.id)}
                  startIcon={<AddIcon />}
                >
                  {productCounts[item.id] || 0}
                </Button>
                <Button onClick={() => handleDecrementCount(item.id)} variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  style={{ color: "red" }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveFromBasket(item.id)}
                >
                  Remove from basket
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br></br>
      <div style={{ fontWeight: "bold", fontSize: 40, marginTop: 30 }}>
        Total Price: {`${calculateTotalPrice()}$`}
        {/* <Button onClick={handleOrderClick} style={{backgroundColor:"#FF6B4C",border:" 1px solid #FF6B4C",color:"white",marginLeft:"20px",marginTop:"-5px"}} variant="outlined">Order </Button> */}
      </div>
    </>
  );
}

export default Checkout;
