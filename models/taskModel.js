import { Schema, model, Types } from 'mongoose';

const TaskSchema = new Schema(
    {
        _id: Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        complete: {
            type: Boolean,
            required: true,
            default: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        versionKey: false
    }
);

const Task = model('task', TaskSchema);

export default Task;