import express from 'express';
import middlewareLogging from './middleware/middleware-logger';
import middlewarePassport from './middleware/middleware-passport';
import middlewareRequestParser from './middleware/middleware-request-parser';

import SecurityConfig from '../../config/development/security.json';

const PORT = process.env.PORT || 3000;
const app = express();

export default function (
    logger,
    userRepository,
    serviceDescriptionRouter
) {
    middlewareLogging(app, logger);
    middlewareRequestParser(app);
    middlewarePassport(app, userRepository, SecurityConfig);

    app.use('/api/services', serviceDescriptionRouter.Router);

    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });
}
