import * as Collections from '../../common/constants/collections';
import serviceDefinitionSchema from '../schemas/serviceDefinitionSchema';

export default function ServiceDefinitionModel(connection) {
    return connection.model(Collections.ServiceDefinition, serviceDefinitionSchema, Collections.ServiceDefinition);
}