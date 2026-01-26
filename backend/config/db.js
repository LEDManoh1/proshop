import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error(
      'Error: MONGO_URI is not defined. Create a .env file in the project root and set MONGO_URI to your MongoDB connection string.'.red
    )
    // In production we must stop; in development warn and continue so the server can start
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    } else {
      console.warn('Continuing without MongoDB connection (development mode)'.yellow)
      return
    }
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)

    // Log connection errors
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`.red)
    })
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    } else {
      console.warn('Could not connect to MongoDB (development mode), continuing without DB'.yellow)
    }
  }
}

export default connectDB
