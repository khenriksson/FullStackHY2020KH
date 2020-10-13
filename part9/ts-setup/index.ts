import express from 'express';
// import BmiCalculator from './bmiCalculator';
import bodyParser from 'body-parser';
import bmi from './bmiCalculator';
import { calculateExercises } from './calculateExercises';

interface Body {
  daily_exercises: number[];
  target: number;
}

interface BodyRequest<T> extends Request {
  body: T;
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

app.post('/exercises', (req: BodyRequest<Body>, res) => {
  const target: number = req.body.target; // eslint-disable-line @typescript-eslint/no-explicit-any
  const daily_exercises: number[] = req.body.daily_exercises; // eslint-disable-line @typescript-eslint/no-explicit-any

  const answer = calculateExercises(daily_exercises, target);

  res.json({ answer });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
