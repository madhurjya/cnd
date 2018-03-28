import * as ServiceStates from '../common/constants/serviceState';
import ServiceInstanceModel from '../data/models/serviceInstanceModel';

class ServiceManager {
    constructor(
        dockerManager,
        serviceDefinitionRepository,
        serviceInstanceRepository
    ) {
        this._dockerManager = dockerManager;
        this._serviceDefinitionRepository = serviceDefinitionRepository;
        this._serviceInstanceRepository = serviceInstanceRepository;
    }

    get Docker() {
        return this._dockerManager;
    }

    get ServiceDefinitionRepository() {
        return this._serviceDefinitionRepository;
    }

    get ServiceInstanceRepository() {
        return this._serviceInstanceRepository;
    }

    async createService(serviceDefinitionId, user) {
        const serviceDefinition = await this.ServiceDefinitionRepository.getById(serviceDefinitionId);
        if (serviceDefinition) {
            const serviceInstance = await this.ServiceInstanceRepository.create({
                definition: serviceDefinition._id,
                user: user._id,
                state: ServiceStates.NEW
            });
            const { ID: serviceId } = await this.Docker.createService(
                `${serviceDefinition._id}_${user._id}_${Date.now()}`,
                serviceDefinition.definition
            );
            serviceInstance.serviceId = serviceId;
            serviceInstance.state = ServiceStates.CREATED;
            await serviceInstance.save();
            return serviceInstance.toObject();
        } else {
            throw new Error('Service definition not found');
        }
    }
}

export default ServiceManager;