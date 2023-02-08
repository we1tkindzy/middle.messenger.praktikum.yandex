const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (_request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
