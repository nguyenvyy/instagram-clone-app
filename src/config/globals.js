const globals =  {
    env: {
        NODE_ENV: process.env.NODE_ENV,
        SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:8080/api/v1'
    }
}

export default globals