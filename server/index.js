const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

app.post('/api/diagnose', (req,res) => {
  const { image } = req.body;

  const mock = {
    disease: 'Leaf Blight',
    confidence: 0.87,
    recommendations: [
      'Apply Fungicide X - 500ml/acre',
      'Remove badly infected leaves'
    ]
  };
  return res.json(mock);
});

app.post('/api/delivery', (req,res) => {
  const id = uuidv4();
  const { type, items } = req.body;

  return res.json({ id, status: 'queued', type, items });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server listening on ${port}`));
