const fs = require('fs')
const {
  clone
} = require('ramda')

const fileLinesToArray = path => fs.readFileSync(path, 'utf8').split('\n')

// this runs prepared initcode
const runInitcode = initcode => {
  const memory = clone(initcode)
  for (let i = 0; i < memory.length; i += 4) {
    const opcode = memory[i]

    if (opcode === 99) {
      break
    }

    const param1 = memory[memory[i + 1]]
    const param2 = memory[memory[i + 2]]

    const result = opcode === 1
      ? param1 + param2
      : param1 * param2

    memory[memory[i + 3]] = result
  }
  return memory[0]
}

// prepares initcode, applies noun and verb to it, returns run results
const runInitcodeProgram = (initcode, noun, verb) => {
  const modifiedProgram = clone(initcode)
  modifiedProgram[1] = noun
  modifiedProgram[2] = verb
  return runInitcode(modifiedProgram)
}

module.exports = {
  fileLinesToArray,
  runInitcodeProgram
}