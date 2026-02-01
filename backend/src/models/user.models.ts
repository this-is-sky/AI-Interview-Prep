import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: {type: String, unique: true, lowercase: true, trim: true},
        password: String,
        resumeText: { type: String },
        isEmailVerified: { type: Boolean, default: false },
        verificationToken: String,
        verificationTokenExpiry: Date
    },
    {timestamps: true}
);

export const User = mongoose.model("User", userSchema);