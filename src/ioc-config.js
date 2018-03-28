//#region Imports
/* eslint-disable sort-imports */
import { DependencyContainer as DI } from 'dependency-injection';

//#region Common components
import ApplicationLogger from './common/lib/logger';
import DockerManager from './logic/dockerManager';
import ModelOfTRepository from './data/repositories/modelOfTRepository';
import RepositoryOfTController from './service/controllers/repositoryOfTController';
//#endregion

//#region User
import UserModel from './data/models/userModel';
//#endregion

//#region Service Descriptor
import ServiceDefinitionModel from './data/models/serviceDefinitionModel';
import ServiceDefinitionRouter from './service/routes/serviceDefinitionRouter';
import ServiceManager from './logic/serviceManager';
import ServiceInstanceModel from './data/models/serviceInstanceModel';
import ServiceController from './service/controllers/serviceController';
import ServiceRouter from './service/routes/serviceRouter';
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

    //#region Docker Manager
    DI.register('dockerManager')
        .asType(DockerManager)
        .withConstructor(ctor => {
            ctor.param('url').asValue('http://192.168.200.3:2375/v{version}/');
            ctor.param('version').asValue('1.36');
        })
        .inSingletonScope();
    //#endregion

    //#region Service
    DI.register('serviceDefinitionRepository')
        .asType(ModelOfTRepository)
        .withConstructor(ctor => {
            ctor.param('model').asValue(ServiceDefinitionModel(dbConnection));
        })
        .inSingletonScope();

    DI.register('serviceDefinitionController')
        .asType(RepositoryOfTController)
        .withConstructor(ctor => {
            ctor.param('repositoryOfT').asDependency('serviceDefinitionRepository');
        })
        .inSingletonScope();

    DI.register('serviceDefinitionRouter')
        .asType(ServiceDefinitionRouter)
        .withConstructor(ctor => {
            ctor.param('serviceDefinitionRepository').asDependency('serviceDefinitionRepository');
            ctor.param('serviceDefinitionController').asDependency('serviceDefinitionController');
        })
        .inSingletonScope();
    DI.register('serviceInstanceRepository')
        .asType(ModelOfTRepository)
        .withConstructor(ctor => {
            ctor.param('model').asValue(ServiceInstanceModel(dbConnection));
        })
        .inSingletonScope();
    DI.register('serviceManager')
        .asType(ServiceManager)
        .withConstructor(ctor => {
            ctor.param('dockerManager')
                .asDependency('dockerManager');
            ctor.param('serviceDefinitionRepository')
                .asDependency('serviceDefinitionRepository');
            ctor.param('serviceInstanceRepository')
                .asDependency('serviceInstanceRepository');
        })
        .inSingletonScope();
    DI.register('serviceController')
        .asType(ServiceController)
        .withConstructor(ctor => {
            ctor.param('serviceManager')
                .asDependency('serviceManager');
        })
        .inSingletonScope();
    DI.register('serviceRouter')
        .asType(ServiceRouter)
        .withConstructor(ctor => {
            ctor.param('serviceController')
                .asDependency('serviceController');
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