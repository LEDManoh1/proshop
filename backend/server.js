// server.js
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import mongoose from 'mongoose'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
// MongoDB connection will be established by startServer() below so we wait for it
// connectDB() is intentionally not invoked here


const app = express()

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// JSON parsing
app.use(express.json())

// Try to enable CORS if the `cors` package is installed. This uses dynamic import
// so the server won't crash if `cors` is not installed. To enable, run:
// npm install cors
;(async () => {
  try {
    const cors = (await import('cors')).default
    app.use(cors())
    console.log('CORS enabled')
  } catch (err) {
    console.warn('CORS not installed; continuing without CORS')
  }
})()

// API routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// PayPal config route
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Test route to verify MongoDB connectivity and show collections
app.get('/api/test', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray()
    res.json({ message: 'MongoDB connected!', collections })
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection failed', error: error.message })
  }
})

// Resolve __dirname
const __dirname = path.resolve()

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Serve frontend public folder (images, favicon, etc.) in dev
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/public')))
  app.use(favicon(path.join(__dirname, '/frontend/public', 'favicon.ico')))
} else {
  // Serve static build files in production
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

// Error middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, '0.0.0.0', () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
      )
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()

