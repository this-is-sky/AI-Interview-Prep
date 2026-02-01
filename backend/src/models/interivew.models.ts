import mongoose, {mongo, Schema} from "mongoose";

const interviewSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: "User"},
        role: String,
        questions: Array,
        answers: Array
    },
    {timestamps: true}
);

export const interview = mongoose.model("Interview", interviewSchema);