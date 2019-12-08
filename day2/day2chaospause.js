// just a dump of different ramda test nothing to see here

const fs = require('fs')
const {
  __,
  always,
  identity,
  compose,
  add,
  subtract,
  divide,
  reduce,
  ifElse,
  gt,
  update,
  equals,
  cond,
  head,
  split,
  splitEvery,
  T,
  map,
  flip,
  when,
  slice,
  reduceWhile,
  addIndex
} = require('ramda')

const input = fs.readFileSync(__dirname + '/inputday2.txt', 'utf8');

const program = compose(
  map(Number),
  split(',')
)(input)


//map(readOpcode)(program)

const instructionSets = splitEvery(4)

// const res = compose(
//   map(
//     compose(
//       readOpcode,
//       head
//     )
//   ),
//   instructionSets
// )(program)
// console.log(res)

// const updateProgramValue = (program, position, newValue) =>
  // update(position, newValue)


  // adjust? ap?

/*
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
*/

const isQuad = (acc, x) => {
  console.log(`predicate ${acc} - ${x}, truthy: ${x % 4 === 1}`)
  return x % 4 === 1
}
const xs = [4, 8, 5, 60, 777];
// console.log( 'total: ' +
//   addIndex(reduce)(
//     (acc, curr, index) => {
//       console.log(index)
//       return acc + curr
//     }, 0)
//     (xs)
// )

const fourth = (index) => { 
  console.log(`fourth, index: ${index}, truthing: ${index % 4 === 0}`)
  return index % 4 === 0
}
const reduceWhileIndex = addIndex(flip(reduceWhile))


const addInstr = () => console.log('adding')
const multiplyInstr = () => console.log('multiplying')
const haltInstr = () => console.log('halting')
const programError = opcode => { throw new Error(`invalid opcode ${opcode}`) }

const readOpcode = cond([
  [equals(1), addInstr],
  [equals(2), multiplyInstr],
  [equals(99), haltInstr],
  [T, programError],
])

const getOpCode = (acc, index) => {
  const instruction = getInstruction(index)(acc)
  const opcode = head(instruction)
  return opcode
}

const getInstruction = index => slice(index, index + 4)
const singleBatch = (acc, index) => {
  const opcode = getOpCode(acc, index)
  // const instruction = getInstruction(index)(acc)

  console.log(opcode)
  // const opcode = head(instruction)
  // const newMemory = readOpcode(opcode)
  console.log(`on when, acc: ${acc}, index: ${index}`)
  return acc
}

const processBatches = (acc, curr, index) => {
  // console.log(`on processBatches, acc: ${acc}, curr: ${curr}, what: ${what}, index: ${index}`)
  return when(
    () => fourth(index),
    () => singleBatch(acc, index)
  )(acc)
}
const calculateProgram = initialMemory => {
  return reduceWhileIndex(
    (acc, curr, index) => {
      processBatches
    }
    processBatches,
    (acc, curr, index) => {
      console.log('fourthing', index)
      if (fourth(index)) {
        const opcode = getOpCode(acc, index)
        return opcode !== 99

      } else {
        return true
      }
      
    },
    initialMemory)(initialMemory)
}



console.log(calculateProgram([1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,99]))