interface calculateValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (arr: number[], target: number) => {
  const periodLength = arr.length;

  const sumReducer = function (accumulator, currentValue) {
    return accumulator + currentValue;
  };
  const training = () => {
    let check: number = 0;
    console.log('check :>> ', check);
    console.log('arr.length :>> ', arr.length);
    for (let i: number = 0; i < arr.length; i++) {
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

  return {
    periodLength: arr.length,
    trainingDays: trainingDays,
    success: success(),
    rating: rate(),
    ratingDescription: description(),
    target: target,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
