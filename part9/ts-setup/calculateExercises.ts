interface CalculateValue {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ObjectValues {
  target: number;
  days: number[];
}

const parsedArguments = (args: Array<string>): ObjectValues => {
  if (args.length < 4) throw new TypeError('Not enough arguments');

  const arr = args.slice(3);

  for (let i = 0; i < arr.length; i++) {
    // check if array value is false or NaN

    if (isNaN(Number(arr[i]))) {
      console.log('NaN found at place ' + String(i));
      throw new TypeError('Provided values were not number!');
    }
  }
  console.log('arr :>> ', arr);
  const newArr = arr.map((i) => Number(i));

  return {
    target: Number(args[2]),
    days: newArr,
  };
};

export const calculateExercises = (
  arr: number[],
  target: number
): CalculateValue => {
  console.log('arr :>> ', arr);
  if (!arr || !target) throw new TypeError('parameters missing');
  console.log('typeof arr :>> ', typeof arr);
  if (typeof arr !== 'object' || typeof target !== 'number')
    throw new TypeError('malformatted parameters');
  const periodLength = arr.length;

  console.log('arr :>> ', arr);
  const sumReducer = function (accumulator: number, currentValue: number) {
    return accumulator + currentValue;
  };
  const training = () => {
    let check = 0;
    console.log('check :>> ', check);
    console.log('arr.length :>> ', arr.length);
    for (let i = 0; i < arr.length; i++) {
      console.log('arr[i] :>> ', arr[i]);
      console.log('i :>> ', i);

      if (arr[i] !== 0) check++;
      console.log('check :>> ', check);
    }
    return check;
  };

  const trainingDays = training();

  const average: number = arr.reduce(sumReducer) / periodLength;
  const success = () => {
    if (average >= target) return true;
    else return false;
  };

  const rate = () => {
    const times = target * arr.length;
    console.log('times :>> ', times);
    const division = times / 3;
    console.log('division :>> ', division);
    const sum = arr.reduce(sumReducer);
    console.log('sum :>> ', sum);

    if (sum >= 2 * division) return 3;
    else if (sum < 2 * division) return 2;
    else return 1;
  };

  const description = () => {
    const rates = rate();
    if (rates === 3) return 'awesome';
    else if (rates === 2) return 'not too bad but could be better';
    else return 'meh';
  };

  const returned = {
    periodLength: arr.length,
    trainingDays: trainingDays,
    success: success(),
    rating: rate(),
    ratingDescription: description(),
    target: target,
    average: average,
  };

  return returned;
};
let answer = '';
try {
  const { target, days } = parsedArguments(process.argv);
  console.log('target :>> ', target);
  calculateExercises(days, target);
} catch (e) {
  if (e instanceof Error) answer = e.message;
  console.log('Error, something bad happened, message: ', answer);
}
