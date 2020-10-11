interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not number!');
  }
};

const bmiCalculator = (a: number, b: number) => {
  const height = a / 100;
  const square: number = height * height;
  const result = b / square;

  if (result < 15) return console.log('Severely underweight');
  else if (result < 16) return console.log('Underweight');
  else if (result < 25) return console.log('Normal (healthy weight)');
  else if (result >= 25) return console.log('Overweight');
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  bmiCalculator(value1, value2);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
// console.log(bmiCalculator(163, 65));
