const globalHandler = (req, res) => {
    console.log(err)
    const status =  err.status || 500
    res.status( status).json({error: error.message})
}

module.error= globalHandler;