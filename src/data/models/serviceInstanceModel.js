import * as Collections from '../../common/constants/collections';
import ServiceInstanceSchema from '../schemas/serviceInstanceSchema';

export default function ServiceInstanceModel(connection) {
    return connection.model(Collections.ServiceInstance, ServiceInstanceSchema, Collections.ServiceInstance);
}