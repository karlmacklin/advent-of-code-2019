const { fileLinesToArray } = require('../common')
const {
  __,
  always,
  compose,
  add,
  subtract,
  divide,
  reduce,
  ifElse,
  gt,
  converge,
  o
} = require('ramda')

const input = fileLinesToArray(__dirname + '/inputday1.txt')

// part 1

const fuelForMass = compose(
  subtract(__, 2),
  Math.floor,
  divide(__, 3)
)

// non ramda-version:
// const fuelForMass = mass => Math.floor(mass / 3) - 2

const part1Answer = reduce(
  (acc, curr) => add(acc, fuelForMass(curr)), 0)
  (input)

console.log(`Part 1 answer: ${part1Answer}`)

// part 2

const recursiveFuelCount = ifElse(
  gt(__, 0),
  converge(add, [
    fuelForMass,
    o(a => recursiveFuelCount(a), fuelForMass)
  ]),
  always(0)
)

const part2Answer = reduce(
  (acc, curr) => acc + recursiveFuelCount(curr), 0)
  (input)

console.log(`Part 2 answer: ${part2Answer}`)