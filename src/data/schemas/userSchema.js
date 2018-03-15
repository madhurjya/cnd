import { Schema } from 'mongoose';

const UserSchema = new Schema({
    _id: {
        type: String,
        maxLength: 32,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxLength: 512
    },
    email: {
        type: String,
        required: true,
        maxLength: 512
    },
    isActive: {
        type: Boolean,
        required: true,
    }
});

export default UserSchema;