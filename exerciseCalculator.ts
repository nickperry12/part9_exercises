interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  let ratingDescription = 'no rating';

  const getAverage = (hours: number[]): number => {
    const sum = hours.reduce((accum: number, current: number) => {
      return accum + current;
    }, 0)

    return sum / hours.length;
  };

  const getRating = (): number => {
    const average = getAverage(hours);
    let result = average / target;
    switch (true) {
      case (result <= 0.33):
        ratingDescription = 'adequate';
        return 1;
      case (result > 0.33 && result <= 0.66):
        ratingDescription = 'good!';
        return 2;
      case (result > 0.66 && result <= 100):
        ratingDescription = 'great!'
        return 3;
      default:
        return 0;
    }
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h !== 0).length,
    success: getAverage(hours) >= target,
    rating: getRating(),
    ratingDescription: ratingDescription,
    target,
    average: getAverage(hours)
  }
}

const target: number = Number(process.argv[2]);
const hours: number[] = process.argv.slice(3).map(t => Number(t));
console.log(target);
console.log(hours);
console.log(calculateExercises(hours, target));