const handlers = require ( "../lib")

test( 'test dodawania (1+2)', () => {
        const s = handlers.sum( 1, 2)
        expect( s).toBe( 3)
    }
)

test( 'test dodawania (0+0)', () => {
    const s = handlers.sum( 0, 0)
    expect( s).toBe( 0)
}
)

test( 'test dodawania (-1+2)', () => {
    const s = handlers.sum( -1, 2)
    expect( s).toBe( 1)
}
)

test( 'test dodawania (-1-2)', () => {
    const s = handlers.sum( -1, -2)
    expect( s).toBe( -3)
}
)

test( 'test dodawania (10+20)', () => {
        const s = handlers.sum( 10, 20)
        expect( s).toBe( 30)
    }
)



