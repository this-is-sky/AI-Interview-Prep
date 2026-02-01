import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { parseResume } from "../services/resume.service.js";
import { User } from "../models/user.models.js";

export async function uploadResume(req: AuthRequest, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // 1️⃣ Parse PDF
    const resumeText = await parseResume(req.file.buffer);

    // 2️⃣ Save to DB
    await User.findByIdAndUpdate(req.user!.id, {
      resumeText
    });

    res.json({
      message: "Resume uploaded and parsed successfully",
      textLength: resumeText.length
    });
  } catch (error: any) {
    console.error("Resume upload error:", error);
    res.status(500).json({ 
      message: "Failed to process resume", 
      error: error.message 
    });
  }
}
