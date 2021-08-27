const database = require('../config/database')
const { ObjectId } = require('mongodb')

module.exports = {
    async getAllMovies() {
        const db = await database.connect()
        const movies = db.collection('movies').find().toArray()
        return movies
    },
    
    async getMovieById(id) {
        const db = await database.connect()
        return db.collection('movies').findOne({ _id: ObjectId(id) })
    },
    
    async getMoviePremieres() {
        const db = await database.connect()
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        // pega os ultimos 30 dias
        
        return db.collection('movies').find( { dataLancamento: { $gte: monthAgo } }).toArray()
    },
    
    async disconnect() {
        return database.disconnect()
    }
}
