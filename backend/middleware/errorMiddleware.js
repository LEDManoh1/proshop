const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)

  // Log full error details for debugging (timestamp, request info, and stack)
  console.error(
    `[${new Date().toISOString()}] Error on ${req.method} ${req.originalUrl} - Status: ${statusCode}\n${err.stack}`
  )

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
