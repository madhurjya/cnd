import express from 'express';
import middlewareLogging from './middleware/middleware-logger';
import middlewareParsing from './middleware/middleware-request-parser';

const PORT = process.env.PORT || 3000;
const app = express();

export default function (
    logger,
    serviceDescriptionRouter
) {
    middlewareLogging(app, logger);
    middlewareParsing(app);

    app.use('/api/services', serviceDescriptionRouter.Router);

    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });
}
