//1. Server/DB configuration
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./networking/user.js');
const authRoute = require('./networking/auth.js');
const productsRoute = require('./networking/product.js');
const cartRoute = require('./networking/cart.js');
const orderRoute = require('./networking/order.js');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connection success'))
.catch((err) => {console.log(err);});

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);


app.listen(process.env.PORT || 5000, () => {console.log('backend server is good')});

//MAY HAVE TO EXPRESS MORE SPECIFIC ROUTES IN ROUTE DECLARATION EX: INSTEAD OF /:ID USE /:CARTID.
//check tab with stackoverflow for refrence
//still need to implement stripe api then done.