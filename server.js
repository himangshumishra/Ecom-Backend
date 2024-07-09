const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
connectDB('mongodb://127.0.0.1:27017/productapi'); 
app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
