import * as Collections from '../../common/constants/collections';
import serviceDescriptionSchema from '../schemas/serviceDescriptionSchema';

export default function (connection) {
    return connection.model(Collections.ServiceDescription, serviceDescriptionSchema);
}