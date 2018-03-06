import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(process.cwd(), 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});

app.listen(3001);
