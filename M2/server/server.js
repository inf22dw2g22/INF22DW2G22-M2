require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const config = require('./controllers/Config');
const routes = require("./routes");
const swaggerSpec = require("./controllers/SwaggerSpecs");
const swaggerUi = require("swagger-ui-express");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', routes.users);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/faturas",  routes.faturas);
app.use("/clientes", routes.clientes);
app.use("/detalheFaturas",  routes.detalheFaturas);
app.use("/produtos", routes.produtos);

// global error handler
app.use(errorHandler);

// start server
app.listen(config.PORT, function () {
    console.log(`app running on ${config.HOST}:${config.PORT}`);
});