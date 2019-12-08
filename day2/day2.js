const fs = require('fs')

const input = fs.readFileSync(__dirname + '/inputday2.txt', 'utf8');
const programStr = input.split(',')

const calculateProgram = (noun, verb) => {
    const program = programStr.map(Number)
    program[1] = noun
    program[2] = verb

    for (let i = 0; i < program.length; i += 4) {
        const opcode = program[i]
    
        if (opcode === 99) {
            break
        }
    
        const var1 = program[program[i + 1]]
        const var2 = program[program[i + 2]]
    
        const result = opcode === 1
            ? var1 + var2
            : var1 * var2
        
        program[program[i + 3]] = result
    }
    return program[0]
}

// solve first part
const resultPart1 = calculateProgram(12, 2)
console.log(resultPart1)

// part 2

const solveSecondPart = () => {
    nounloop:
    for (let noun = 0; noun < 100; noun++) {
        verbloop:
        for (let verb = 0; verb < 100; verb++) {
            const calculatedResult = calculateProgram(noun, verb)
            if (calculatedResult === 19690720) {
                return 100 * noun + verb
            }
            
        }
        
    }
}

const resultPart2 = solveSecondPart()
console.log(resultPart2)