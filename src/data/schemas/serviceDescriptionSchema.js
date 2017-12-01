import { Schema } from 'mongoose';

const ServiceDescriptionSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 512
    },
    description: {
        type: String,
        required: true,
        maxLength: 2048
    }
});

export default ServiceDescriptionSchema;