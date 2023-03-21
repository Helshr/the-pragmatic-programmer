const readline = require('readline')
const log = console.log.bind(console)


const getInput = () => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
          
        rl.question('>>>> ', (answer) => {
            resolve(answer)
            rl.close()
        })
    })
}


class Parser {
    
    constructor(x=0, y=0) {
        this.COMMANDS = {
            'P': this.selectPen,
            'D': this.penDown,
            'U': this.penUp,
            'N': this.drawNotrh,
            'E': this.drawEast,
            'S': this.drawSouth,
            'W': this.drawWest,
        }
        this.PENS = [
            'black',
            'white',
            'red',
            'green',
            'blue',
        ]
        this.pen = this.PENS[0]
        this.x = x
        this.y = y
        this.drawing = false
    }

    echo = (arg) => {
        log("ECHO: ", arg)
    }

    selectPen = (number) => {
        try {
            this.pen = this.PENS[parseInt(number)]
            log("selected pen is: ", this.pen)
        } catch {
            log("selected pen color error.")
        }
    }

    penUp = () => {
        this.drawing = false
        log("pen up")
    }

    penDown = () => {
        this.drawing = true
        log("pen down")
    }

    move = (dx, dy) => {
        if (this.drawing) {
            log(`draw from [${this.x}, ${this.y}] to [${this.x + dx}, ${this.y + dy}]`)
        } else {
            log(`moved from [${this.x}, ${this.y}] to [${this.x + dx}, ${this.y + dy}]`)
        }
        this.x += dx
        this.y += dy
    }

    drawNotrh = (distance) => {
        this.move(0, parseInt(distance))
    }

    drawEast = (distance) => {
        this.move(parseInt(distance), 0)
    }

    drawSouth = (distance) => {
        this.move(0, -parseInt(distance))
    }

    drawWest = (distance) => {
        this.move(-parseInt(distance), 0)
    }

    parse = (code) => {
        const args = code.split(" ")
        try {
            const command = this.COMMANDS[args[0]]
            command(args[1])
        } catch(err) {
            log(`${args[0]} not exist: `, err)
        }
    }
}

const __main = async () => {
    log("Will parser turtle code: ")
    const parser = new Parser()
    try {
        while (true) {
            const input = await getInput()
            try {
                parser.parse(input)
            } catch(err) {
                log("Parse error: ", err)
            }
        }
    } catch(err) {
        log("I catch error...: ",  err)
    } finally {
        log("Bye bye ~")
    }
}

__main()
