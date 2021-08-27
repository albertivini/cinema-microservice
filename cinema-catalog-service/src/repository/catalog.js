const database = require('../config/database')
const { ObjectId } = require('mongodb')

module.exports = {
    async getAllCities() {
        const db = await database.connect()
        return db.collection('catalog').find({}, { 
            cidade: 1, 
            uf: 1, 
            pais: 1}).toArray()
    },

    async getCinemasByCityId(cityId) {
        const objectCityId = ObjectId(cityId)
        const db = await database.connect()
        const cities = await db.collection('catalog').find({ _id: objectCityId }, { cinemas: 1 }).toArray()
        return cities[0].cinemas
    },

    async getMoviesByCinemaId(cinemaId) {
        const objectCinemaId = ObjectId(cinemaId)
        const db = await database.connect()
        const cinemas = db.collection('catalog').aggregate([
            { $match: { 'cinemas._id': objectCinemaId } },
            { $unwind: '$cinemas' },
            { $unwind: '$cinemas.salas' },
            { $unwind: '$cinemas.salas.sessoes' },
            { $group: { 
                _id: { 
                    filme: '$cinemas.salas.sessoes.filme', 
                    idFilme: '$cinemas.salas.sessoes.idFilme' } } }
        ]).toArray()
        return cinemas
    },

    async getMoviesByCityId(cityId) {
        const objectCityId = ObjectId(cityId)
        const db = await database.connect()

        const sessions = await db.collection('catalog').aggregate([
            { $match: { '_id': objectCityId } },
            { $unwind: '$cinemas' },
            { $unwind: '$cinemas.salas' },
            { $unwind: '$cinemas.salas.sessoes' },
            { $group: { 
                _id: { 
                    filme: '$cinemas.salas.sessoes.filme', 
                    idFilme: '$cinemas.salas.sessoes.idFilme' } } }
        ]).toArray()

        return sessions.map(item => {
            return { 
                idFilme: item._id.idFilme, 
                filme: item._id.filme }
        })
    },

    async getMovieSessionByCityId(movieId, cityId) {
        const objectMovieId = ObjectId(movieId)
        const objectCityId = ObjectId(cityId)
        const db = await database.connect()
        const sessions = await db.collection('catalog').aggregate([
            { $match: { '_id': objectCityId } },
            { $unwind: '$cinemas' },
            { $unwind: '$cinemas.salas' },
            { $unwind: '$cinemas.salas.sessoes' },
            { $match: { 'cinemas.salas.sessoes.idFilme': objectMovieId } },
            { $group: { 
                _id: { 
                    filme: '$cinemas.salas.sessoes.filme', 
                    idFilme: '$cinemas.salas.sessoes.idFilme', 
                    idCinema: '$cinemas._id', 
                    sala: '$cinemas.salas.nome', 
                    sessao: '$cinemas.salas.sessoes' } } }
        ]).toArray()

        return sessions.map(item => { 
            return {
                idFilme: item._id.idFilme,
                filme: item._id.filme,
                idCinema: item._id.idCinema,
                sala: item._id.sala,
                sessao: item._id.sessao,
            }
        })
    },

    async getMovieSessionByCinemaId(movieId, cinemaId) {
        const objectMovieId = ObjectId(movieId)
        const objectCinemaId = ObjectId(cinemaId)
        const db = await database.connect()
        const sessions = await db.collection('catalog').aggregate([
            { $match: { 'cinemas._id': objectCinemaId } },
            { $unwind: '$cinemas' },
            { $unwind: '$cinemas.salas' },
            { $unwind: '$cinemas.salas.sessoes' },
            { $match: { 'cinemas.salas.sessoes.idFilme': objectMovieId } },
            { $group: { 
                _id: { 
                    filme: '$cinemas.salas.sessoes.filme', 
                    idFilme: '$cinemas.salas.sessoes.idFilme', 
                    sala: '$cinemas.salas.nome', 
                    sessao: '$cinemas.salas.sessoes' } } }
        ]).toArray()

        return sessions.map(item => {
            return {
                idFilme: item._id.idFilme,
                filme: item._id.filme,
                sala: item._id.sala,
                sessao: item._id.sessao
            }
        })
    },

    async disconnect() {
        return database.disconnect()
    }

}