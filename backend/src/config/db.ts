import mongoose  from "mongoose";


export async function connectDB() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI environment variable is not set");
        }
        
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB Connected successfully");
    } catch (error: any) {
        console.error("❌ MongoDB Connection Error:", error.message);
        throw error;
    }
}