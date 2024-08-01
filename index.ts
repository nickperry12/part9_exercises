import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();

app.use(express.json());

interface BMI {
  weight: number;
  height: number;
  bmi: string;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    const result: BMI = {
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height), Number(weight))
    };
    res.status(200).json(result);
  } catch (error) {
    console.error(`There was an error: ${error.message}`);
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res): object | void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !daily_exercises || !(Array.isArray(daily_exercises))) {
    res.status(400).send({ error: 'malformatted data' });
  }

  if (!target || typeof(target) !== 'number') {
    res.status(400).send({ error: 'malformatted data' });
  }

  console.log(daily_exercises, req.body);
  const result: Result = calculateExercises(daily_exercises as number[], Number(target));
  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});