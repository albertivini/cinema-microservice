require('dotenv-safe').config()
const catalog = require('./catalog')

let testCityId = null
let testCinemaId = null
let testMovieId = null

beforeAll( async () => {
    const cities = await catalog.getAllCities()
    testCityId = cities[1]._id
    testCinemaId = cities[1].cinemas[0]._id
    testMovieId = cities[1].cinemas[0].salas[0].sessoes[0].idFilme
})

test('Repository getAllCities', async () => {
    const cities = await catalog.getAllCities()
    expect(Array.isArray(cities)).toBeTruthy()
    expect(cities.length).toBeGreaterThan(0)
})

test('Repository getCinemasByCityId', async () => {
    const cinemas = await catalog.getCinemasByCityId(testCityId)
    expect(Array.isArray(cinemas)).toBeTruthy()
    expect(cinemas.length).toBeGreaterThan(0)
})

test('Repository getMoviesByCinemaId', async () => {
    const result = await catalog.getMoviesByCinemaId(testCinemaId)
    expect(Array.isArray(result)).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
})

test('Repository getMoviesByCityId', async () => {
    const result = await catalog.getMoviesByCityId(testCityId)
    expect(Array.isArray(result)).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
})

test('Repository getMovieSessionByCityId', async () => {
    const result = await catalog.getMovieSessionByCityId(testMovieId, testCityId)
    expect(Array.isArray(result)).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
})

test('Repository getMovieSessionByCinemaId', async () => {
    const result = await catalog.getMovieSessionByCinemaId(testMovieId, testCinemaId)
    expect(Array.isArray(result)).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
})

test('Repository Disconnect', async () => {
    const isDisconnected = await catalog.disconnect()
    expect(isDisconnected).toBeTruthy()
})