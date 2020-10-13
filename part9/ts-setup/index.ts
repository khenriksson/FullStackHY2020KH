import express from 'express';
// import BmiCalculator from './bmiCalculator';
import bodyParser from 'body-parser';
import bmi from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
