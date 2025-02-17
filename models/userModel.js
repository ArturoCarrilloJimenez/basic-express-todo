import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: false,
            default: 'John Doe',
        },
        password: {
            type: String,
            required: true,
        },
        task: {
            type: [{ type: Schema.Types.ObjectId, ref: 'task' }],
            required: false,
            default: [],
        },
    },
    {
        versionKey: false
    }
);

const User = model('user', UserSchema);

export default User;