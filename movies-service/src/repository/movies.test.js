require('dotenv-safe').config()

const filmes = require('./movies')

beforeAll( async () => {
    const movies = await filmes.getAllMovies()
    testId = movies[0]._id
})

test('GetAllMovies', async () => {
    const movies = await filmes.getAllMovies()
    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toBeGreaterThan(0)
})

test('GetMovieByID', async () => {
    const movies = await filmes.getMovieById(testId)
    expect(movies).toBeTruthy()
    expect(movies._id).toEqual(testId)
})

test('GetMoviePremieres', async () => {
    const movies = await filmes.getMoviePremieres()
    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toBeGreaterThan(0)
})

test('Disconnect', async () => {
    const isDisconnected = await filmes.disconnect()
    expect(isDisconnected).toBeTruthy()
})
