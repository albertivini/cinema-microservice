(async () => {
    require('dotenv-safe').config()
    const cinemaCatalog = require('./api/cinema-catalog')
    const server = require('./server/server')
    const repository = require('./repository/catalog')

    try {
        await server.start(cinemaCatalog, repository)
        console.log('Server rodando na porta ' + process.env.PORT)
    } catch (err) {
        console.error(err)
    }
})()