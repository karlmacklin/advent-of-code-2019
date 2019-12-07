const fs = require('fs')
const readline = require('readline')

const fileLinesToArray = async path => {
    const fileStream = fs.createReadStream(path);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    const results = []

    for await (const line of rl) {
      results.push(line)
    }

    return results
}

const calc = mass => Math.floor(mass / 3) - 2

const input = await fileLinesToArray('./day1/inputday1.txt')

const firstCalculation = input.reduce((acc, curr) => acc + calc(curr), 0)

firstCalculation // result part 1

const recursiveFuelCount = mass => {
    const calculated = calc(mass)
    return calculated > 0
        ? calculated + recursiveFuelCount(calculated)
        : 0
}

const secondCalculation = input.reduce((acc, curr) => 
    acc + recursiveFuelCount(Number(curr)), 0)

secondCalculation // result part 2
