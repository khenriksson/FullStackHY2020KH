const bmiCalculator = (a: number, b: number) => {
  const height = a / 100
  const square: number = height * height
  const result = b / square
  console.log('result :>> ', result)

  if (result < 15) return 'Severely underweight'
  else if (result < 16) return 'Underweight'
  else if (result < 25) return 'Normal (healthy weight)'
  else if (result >= 25) return 'Overweight'
}

console.log(bmiCalculator(163, 65))
