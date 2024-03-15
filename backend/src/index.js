import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("hello from the root");
});

app.listen(3000, () => console.log("server starting on port 3000"));
