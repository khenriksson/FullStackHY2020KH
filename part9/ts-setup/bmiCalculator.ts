const bmi = (height: string, weight: string): string => {
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
  let answer = '';

  try {
    // const arr = ['string', 'string', height, weight]; // I know I shouldn't do it like this but this was the fastest way without making additional code changes

    // if (value1 || !value2) throw new Error('malformatted parameters');
    // return bmiCalculator(Number(height), Number(weight));
    if (!height || !weight) throw new Error('malformatted parameters');
    const heigh = Number(height) / 100;
    const square: number = heigh * heigh;
    const result = Number(weight) / square;

    if (result <= 15) answer = 'Severely underweight';
    else if (result <= 16) answer = 'Underweight';
    else if (result <= 25) answer = 'Normal (healthy weight)';
    else answer = 'Overweight';
  } catch (e: unknown) {
    // const e: Error = _e;
    if (e instanceof Error) {
      answer = e.message;
    }
  }
  return answer;
};
// console.log(bmiCalculator(163, 65));

export default bmi;
