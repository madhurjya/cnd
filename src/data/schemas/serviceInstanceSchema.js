import { Schema } from 'mongoose';

const ServiceInstanceSchema = new Schema({
    definition: {
        type: String,
        required: true,
        maxLength: 32
    },
    user: {
        type: String,
        required: true,
        maxLength: 32
    },
    state: {
        type: String,
        required: true,
        maxLength: 16
    },
    serviceId: {
        type: String,
        maxLength: 128
    }
});

export default ServiceInstanceSchema;