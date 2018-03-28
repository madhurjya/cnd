import { Schema } from 'mongoose';
import ServiceDefinitionSchema from './serviceDefinitionSchema';

const ServiceTierDefinitionSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 512
    },
    description: {
        type: String,
        required: true,
        maxLength: 2048
    },
    tags: {
        type: [String],
        required: true
    },
    serviceTiers: {
        type: [ServiceDefinitionSchema],
        required: true
    }
});

export default ServiceTierDefinitionSchema;