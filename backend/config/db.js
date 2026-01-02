import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error(
      'Error: MONGO_URI is not defined. Create a .env file in the project root and set MONGO_URI to your MongoDB connection string.'.red
    )
    process.exit(1)
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
