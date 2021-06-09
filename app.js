const express = require('express');
const app = express();
const routes = require('./api/routes');

app.set('port', 3000); // Setting the port value at one place to avoid the single point of failure
app.use(routes);

const server = app.listen(process.env.PORT || app.get('port'), () => {
    const port = server.address().port;
    console.log(`Server started on port ${port}`);
});