const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const matchRoutes = require('./routes/matchRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/matches', matchRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});