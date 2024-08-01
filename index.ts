import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const params = req.query;
  console.log(params);
  res.send('bmi');
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})