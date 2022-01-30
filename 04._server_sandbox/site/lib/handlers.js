
exports.processForm = (req, rsp) => {
    console.log('Formularz: ' + req.query)
    console.log('Imię: ' + req.body.surname)
    console.log('Kolor: ' + req.body.color)
    console.log('CSRF: ' + req.body._csrf)

    rsp.redirect( 303, '/home.html')
}

exports.gohome = (req, rsp) => {
    rsp.redirect( 301, '/home.html')
}

exports.headers = (req, rsp) => {
    rsp.type( 'text/plain')
    const headers = Object.entries( req.headers).map( ([key, value]) => `${key} : ${value}`)
    rsp.send( headers.join('\n'))
}

exports.book = (req, rsp) => {
    const book = {
        title: "Wichrowe Wzgórza",
        isbn: "5255666354"
    }
    rsp.type('application/json')
    rsp.send( book)
}

exports.book2 = (req, rsp) => {
    const book = {
        title: "Harry Potter 1",
        isbn: "9592857254"
    }
    rsp.json( book)
}

exports.fail = (req, res) => {
    throw new Error('Nie!')
}

exports.epicFail = (req, res) => {
    process.nextTick( () => { throw new Error('Bum!') } )
}

exports.notFound = (req, rsp) => {
    rsp.type( "text/plain")
    rsp.status( "404")
    rsp.send( "404 - Nie znaleziono");
}

exports.uncatchException = err => {
    console.error('NIEOBSŁUŻONY WYJĄTEK\n', err.stack);
    process.exit(1)
}
