import express from 'express';
import diagnosesRouter from './routes/diagnoses';

const app = express();
var cors = require('cors');

app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use(cors());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
