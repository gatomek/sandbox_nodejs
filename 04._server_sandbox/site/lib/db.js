const mongoose = require('mongoose')
const Vacation = require( "./models/vacation")

const { credentials } = require( '../config')
const connectionString = credentials.mongoDbConnection

if( ! connectionString) {
    console.error('Brak ciągu połączenia z MongoDB!')
    process.exit(1)
}

mongoose.connect( connectionString)

const db = mongoose.connection

db.on('error', err => {
        console.error('Błąd MongoDB: ' + err.message)
        process.exit(1)
    }
)

db.once('open', () => console.log('Nawiązano połączenie z MongoDB'))

Vacation.find((err, vacations) => {
    console.log( "--------------------")

    if(err)
        return console.error(err)

    if(vacations.length > 0)
        return

    new Vacation({
            name: 'Jednodniowa wycieczka do Hood River',
            slug: 'hood-river-day-trip',
            category: 'Jednodniowa wycieczka',
            sku: 'HR199',
            description: 'Spędź dzień na żeglowaniu po Kolumbii i rozkoszuj się rzemieślniczymi piwami w Hood River!',
            location: {
                search: 'Hood River, Oregon, USA',
            },
            price: 99.95,
            tags: ['jednodniowa wycieczka', 'hood river', 'żeglowanie', 'windsurfing', 'browary'],
            inSeason: true,
            maximumGuests: 16,
            available: true,
            packagesSold: 0,
        }
    ).save()

    console.log( "saved 1. vacation")

    new Vacation({
            name: 'Krótki urlop na wybrzeżu Oregonu',
            slug: 'oregon-coast-getaway',
            category: 'Wycieczka weekendowa',
            sku: 'OC39',
            description: 'Rozkoszuj się powietrzem znad oceanu oraz urokiem nadbrzeżnych miasteczek!',
            location: {
                search: 'Cannon Beach, Oregon, USA',
            },
            price: 269.95,
            tags: ['wycieczka weekendowa', 'wybrzeże oregonu', 'plażowanie'],
            inSeason: false,
            maximumGuests: 8,
            available: true,
            packagesSold: 0,
        }
    ).save()

    console.log( "saved 2. vacation")

    new Vacation({
            name: 'Wspinaczka skałkowa w Bend',
            slug: 'rock-climbing-in-bend',
            category: 'Przygoda',
            sku: 'B99',
            description: 'Przeżyj dreszcz emocji podczas wspinaczki na pustyni',
            location: {
                search: 'Bend, Oregon, USA',
            },
            price: 289.95,
            tags: ['wycieczka weekendowa ', 'bend', 'pustynia', 'wspinaczka skałkowa'],
            inSeason: true,
            requiresWaiver: true,
            maximumGuests: 4,
            available: false,
            packagesSold: 0,
            notes: 'Przewodnik wycieczki obecnie dochodzi do zdrowia po wypadku narciarskim.',
        }
    ).save()

    console.log( "saved 3. vacation")
})

module.exports = {
    getVacations: async ( options={}) => {
        const vacations = await Vacation.find( options, { name: 1})
        return vacations.map( o => ({ name: o.name}))
    }
    ,
    addVacationInSeasonListener: async (email, sku) => {
    }
}
