

export const errorHandler = (err, req, res, next) => {
    console.error(err)

    return res.status(err.status).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}