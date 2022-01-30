const cluster = require( "cluster")
const os = require( "os")

function startWorker() {
    const worker = cluster.fork()
    console.log(`Klaster: Węzeł roboczy ${worker.id} zaczął działanie`)
}

if(cluster.isMaster) {
    os.cpus().forEach(startWorker)
        cluster.on('disconnect', worker => console.log( `Klaster: Węzeł roboczy ${worker.id} odłączył się od klastra.`))

    cluster.on('exit', (worker, code, signal) => {
            console.log( `Klaster: Węzeł roboczy ${worker.id} zakończył działanie zdarzeniem exit kod ${code} (${signal})` )
            startWorker()
        }
    )
}
else
{
    const port = process.env.PORT || 3000
    require('./app.js')(port)
}
