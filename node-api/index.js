const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const userRoute = require("./router/user")


app.use('/api/v1',userRoute);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
