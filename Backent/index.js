import express from 'express';
import router from './routes/index.router.js';
import configuration from './configuration/index.configarations.js';

const app = express();

configuration(app)
router(app)

app.listen(process.env.PORT, () => console.log("Server Started : ", parseInt(process.env.PORT)));

export default app;