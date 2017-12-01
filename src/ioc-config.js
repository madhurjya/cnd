/* eslint-disable sort-imports */
import { DependencyContainer as DI } from 'dependency-injection';
import ApplicationLogger from './common/lib/logger';

import ServiceDescriptionModel from './data/models/serviceDescriptionModel';

import ModelOfTRepository from './data/repositories/modelOfTRepository';

import RepositoryOfTController from './service/controllers/repositoryOfTController';

import ServiceDescriptionRouter from './service/routes/serviceDescriptionRouter';

export default function (
    logConfig,
    dbConnection
) {
    DI.register('logger')
        .asType(ApplicationLogger)
        .withConstructor(ctor => {
            ctor.param('logConfig').asValue(logConfig);
        })
        .inSingletonScope();

    DI.register('serviceDescriptionRepository')
        .asType(ModelOfTRepository)
        .withConstructor(ctor => {
            ctor.param('model').asValue(ServiceDescriptionModel(dbConnection));
        })
        .inSingletonScope();

    DI.register('serviceDescriptionController')
        .asType(RepositoryOfTController)
        .withConstructor(ctor => {
            ctor.param('repositoryOfT').asDependency('serviceDescriptionRepository');
        })
        .inSingletonScope();

    DI.register('serviceDescriptionRouter')
        .asType(ServiceDescriptionRouter)
        .withConstructor(ctor => {
            ctor.param('serviceDescriptionRepository').asDependency('serviceDescriptionRepository');
            ctor.param('serviceDescriptionController').asDependency('serviceDescriptionController');
        })
        .inSingletonScope();
}