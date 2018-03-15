//#region Imports
/* eslint-disable sort-imports */
import { DependencyContainer as DI } from 'dependency-injection';

//#region Common components
import ApplicationLogger from './common/lib/logger';
import ModelOfTRepository from './data/repositories/modelOfTRepository';
import RepositoryOfTController from './service/controllers/repositoryOfTController';
//#endregion

//#region User
import UserModel from './data/models/userModel';
//#endregion

//#region Service Descriptor
import ServiceDescriptionModel from './data/models/serviceDescriptionModel';
import ServiceDescriptionRouter from './service/routes/serviceDescriptionRouter';
//#endregion
//#endregion

export default function (
    logConfig,
    dbConnection
) {
    //#region Logger
    DI.register('logger')
        .asType(ApplicationLogger)
        .withConstructor(ctor => {
            ctor.param('logConfig').asValue(logConfig);
        })
        .inSingletonScope();
    //#endregion

    //#region Service Descriptor
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
    //#endregion

    //#region User
    DI.register('userRepository')
        .asType(ModelOfTRepository)
        .withConstructor(ctor => {
            ctor.param('model').asValue(UserModel(dbConnection));
        })
        .inSingletonScope();
    //#endregion
}