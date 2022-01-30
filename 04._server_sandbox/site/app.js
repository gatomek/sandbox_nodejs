const express = require( "express")
const app = express()
const port = process.env.port || 3000
const bodyParser = require('body-parser')
const cookieParser = require( "cookie-parser")
const expressSession = require( "express-session")
const morgan = require( "morgan")
const fs = require( "fs")
const cluster = require('cluster')

const handlers = require('./lib/handlers')
const apiHandlers = require('./lib/api-handlers')
const { credentials } = require( './config')

function configLogging() {
    switch(app.get('env')) {
        case 'development':
            app.use(morgan('dev'))
        break

        case 'production':
            const stream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })
            app.use(morgan('combined', { stream }))
        break
    }
}

function applyWorkInClusterNotification( req, res, next)
{
    if(cluster.isWorker)
        console.log(`${cluster.worker.id} node processing`)
    next()
}

function startServer(port) {

    app.disable( 'x-powered-by')

    /* --- */

    configLogging();

    app.use( applyWorkInClusterNotification)
    app.use( express.static( __dirname + "/public"))
    app.use( bodyParser.urlencoded({ extended: true }))
    app.use( bodyParser.json())
    app.use( cookieParser( credentials.cookieSecret))
    app.use( expressSession({ resave: false, saveUninitialized: false, secret: credentials.cookieSecret } ))

    app.get('', handlers.gohome)
    app.get('/headers', handlers.headers)
    app.get('/book', handlers.book)
    app.get('/book2', handlers.book2)
    app.get('/fail', handlers.fail)
    app.get('/epic-fail', handlers.epicFail)

    app.post( '/process-form', handlers.processForm)
    app.post( '/api/newsletter-signup', apiHandlers.api.newsletterSignup)
    app.post( '/api/vacations', apiHandlers.api.vacations)

    app.use( handlers.notFound)

    /* eslint-disable no-unused-vars */
    app.use( (err, req, rsp, next) => {

            console.error( err.message)
            rsp.type( "text/plain")
            rsp.status( 500)
            rsp.send( "500 - Błąd serwera")
        }
    )
    /* eslint-enable no-unused-vars */

    process.on('uncaughtException', handlers.uncatchException)

    app.listen( port, function() { console.log(`Express został uruchomiony w trybie ${app.get('env')} pod adresem http://localhost:${port}`) } )
}

if(require.main === module) {
    startServer( port);
}
else {
    module.exports = startServer
}
