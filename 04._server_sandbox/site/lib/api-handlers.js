
const db = require( './db')

exports.api = {
    newsletterSignup: (req, rsp) => {
        console.log('Imię: ' + req.body.surname)
        console.log('Kolor: ' + req.body.color)
        console.log('CSRF: ' + req.body._csrf)

        rsp.cookie( "Test", "1", { signed: true})
        rsp.send({ result: 'success' })
    },

    vacations: async (req, rsp) => {
        console.log( 'Finding vacations ...')
        const res = await db.getVacations( {available: true})
        console.log( "Found: " + res.length)
        rsp.json(res)
    }
}
