import app from './service/app';
import configureIoc from './ioc-config';
import { DependencyContainer as DI } from 'dependency-injection';
import initDb from './service/init/init-db';

import dbConfig from '../config/development/db.json';
import logConfig from '../config/development/log.json';

Promise.all([
    initDb(dbConfig.cnd)
]).then(([dbConnection]) => {
    configureIoc(
        logConfig,
        dbConnection
    );
    DI.inject(app);

    process.on('SIGINT', async () => {
        await dbConnection.close();
    });
}).catch(err => {
    console.log('An error occurred while initializing the application.', err);
});