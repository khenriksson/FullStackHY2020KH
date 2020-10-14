import express, { Response } from 'express';

// import BmiCalculator from './bmiCalculator';
import bodyParser from 'body-parser';
import bmi from './bmiCalculator';
import { calculateExercises } from './calculateExercises';

interface Body {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = String(req.query.height);
  const weight = String(req.query.weight);
  const answer: string = bmi(height, weight);

  if (!req.query.height || !req.query.weight) {
    res.send({ answer });
  } else {
    res.json({ weight, height, answer });
  }
});

app.post('/exercises', (req, res: Response) => {
  const body = req.body as Body;
  console.log('req.body :>> ', req.body);
  console.log('typeof req.body :>> ', typeof req.body);
  const target: number = body.target;
  const daily_exercises: number[] = body.daily_exercises;

  const answer = calculateExercises(daily_exercises, target);

  res.json({ answer });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
