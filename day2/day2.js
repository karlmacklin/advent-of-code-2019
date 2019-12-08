const fs = require('fs')
const { map } = require('ramda')
const { runInitcodeProgram } = require('../common')

const input = fs.readFileSync(__dirname + '/inputday2.txt', 'utf8');
const programStr = input.split(',')
const programCode = map(Number)(programStr)

// part 1
const part1Answer = runInitcodeProgram(programCode, 12, 2)
console.log(`Part 1 answer: ${part1Answer}`)

// part 2
const solveSecondPart = () => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const calculatedResult = runInitcodeProgram(programCode, noun, verb)
            if (calculatedResult === 19690720) {
                return 100 * noun + verb
            }
        }
    }
}

const part2Answer = solveSecondPart()
console.log(`Part 2 answer: ${part2Answer}`)