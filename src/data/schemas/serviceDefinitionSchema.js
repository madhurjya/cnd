import { Schema } from 'mongoose';

const ServiceDefinitionSchema = new Schema({
    _id: {
        type: String,
        required: true,
        maxLength: 32
    },
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
    definition: {
        type: Object,
        required: true
    }
});

export default ServiceDefinitionSchema;