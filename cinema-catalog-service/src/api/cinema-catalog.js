module.exports = (app, repository) => {
    app.get('/cities', async (req, res, next) => {
        const cities = await repository.getAllCities()
        if(!cities || cities.length === 0) return res.sendStatus(404);
        res.json(cities)
    })

    app.get('/cities/:city/movies', async (req, res, next) => {
        const movies = await repository.getMoviesByCityId(req.params.city)
        if(!movies || movies.length === 0) return res.sendStatus(404);
        res.json(movies)
    })

    app.get('/cities/:city/movies/:movie', async (req, res, next) => {
        const sessions = await repository.getMovieSessionByCityId(req.params.movie, req.params.city)
        if(!sessions || sessions.length === 0) return res.sendStatus(404);
        res.json(sessions)
    })

    app.get('/cities/:city/cinemas', async (req, res, next) => {
        const cinemas = await repository.getCinemasByCityId(req.params.city)
        if(!cinemas || cinemas.length === 0) return res.sendStatus(404);
        res.json(cinemas)
    })
    
    app.get('/cinemas/:cinema/movies', async (req, res, next) => {
        const movies = await repository.getMoviesByCinemaId(req.params.cinema)
        if(!movies || movies.length === 0) return res.sendStatus(404);
        res.json(movies)
    })

    app.get('/cinemas/:cinema/movies/:movie', async (req, res, next) => {
        const sessions = await repository.getMovieSessionByCinemaId(req.params.movie, req.params.cinema)
            if(!sessions || sessions.length === 0) return res.sendStatus(404);
            res.json(sessions)
    })
}