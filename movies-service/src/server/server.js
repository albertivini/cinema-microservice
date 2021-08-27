require('express-async-errors')
const express = require('express')
const morgan = require('morgan')

let server = null

module.exports = {

    async start(api, repository) {
        const app = express()
    
        app.use(morgan('dev'))
    
        app.use((err, req, res, next) => {
            console.error(err)
            res.sendStatus(500)
        })
    
        api(app, repository)
    
        server = app.listen(process.env.PORT)
        return server
    },    
    
    async stop() {
        if (server) await server.close()
        return true
    }
    
}