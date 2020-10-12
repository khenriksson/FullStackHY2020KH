function bmi(height: string, weight: string) {
  //   interface CalculateValues {
  //     value1: number;
  //     value2: number;
  //   }

  //   const parseArguments = (height: string, weight: string): CalculateValues => {
  //     if (!Number(height) && !Number(weight)) {
  //       return {
  //         value1: Number(height),
  //         value2: Number(weight),
  //       };
  //     } else {
  //       throw new Error('malformatted parameters');
  //     }
  //   };

  const bmiCalculator = (a: number, b: number) => {
    if (!a || !b) throw new Error('malformatted parameters');
    const height = a / 100;
    const square: number = height * height;
    const result = b / square;

    if (result <= 15) return 'Severely underweight';
    else if (result <= 16) return 'Underweight';
    else if (result <= 25) return 'Normal (healthy weight)';
    else return 'Overweight';
  };

  try {
    // const arr = ['string', 'string', height, weight]; // I know I shouldn't do it like this but this was the fastest way without making additional code changes

    // if (value1 || !value2) throw new Error('malformatted parameters');
    return bmiCalculator(Number(height), Number(weight));
  } catch (e) {
    return e.message;
  }
}
// console.log(bmiCalculator(163, 65));

export default bmi;
