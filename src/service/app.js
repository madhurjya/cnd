import express from 'express';
import middlewareLogging from './middleware/middleware-logger';
import middlewarePassport from './middleware/middleware-passport';
import middlewareRequestParser from './middleware/middleware-request-parser';

import CorsConfig from '../../config/development/cors.json';
import SecurityConfig from '../../config/development/security.json';
import middlewareCors from './middleware/middleware-cors';

const PORT = process.env.PORT || 8080;
const app = express();

export default function (
    logger,
    userRepository,
    serviceDefinitionRouter,
    serviceRouter
) {
    middlewareLogging(app, logger);
    middlewareRequestParser(app);
    middlewarePassport(app, userRepository, SecurityConfig);
    middlewareCors(app, CorsConfig);

    const apiRouter = express.Router();
    apiRouter.use('/serviceDefinitions', serviceDefinitionRouter.Router);
    apiRouter.use('/services', serviceRouter.Router);
    app.use('/api', apiRouter);

    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });
}
