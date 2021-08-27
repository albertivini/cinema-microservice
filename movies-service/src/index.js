(async () => {
    require('dotenv-safe').config()

    const movies = require('./api/movies')
    const server = require('./server/server')
    const repository = require('./repository/movies')

    try {
        await server.start(movies, repository)
        console.log('Server rodando na porta ' + process.env.PORT)
    } catch (err) {
        console.error(err)
    }
})()