import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { interview } from "../models/interivew.models.js";
import { generateQuestions, evaluateAnswer } from "../services/ai.services.js";
import { User } from "../models/user.models.js";

const router = Router();

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
    const { role, difficulty, questionCount } = req.body;

    // Fetch user's resume if available
    const user = await User.findById(req.user!.id);
    const resumeText = user?.resumeText || undefined;

    // Generate questions based on resume (if available), role, and difficulty
    const questions = await generateQuestions(
        role ?? "General", 
        resumeText, 
        difficulty ?? "medium",
        questionCount ?? 5
    );

    const session = await interview.create({
        userId: req.user!.id,
        role: role ?? "General",
        questions,
        answers: [],
    });

    res.json({ sessionId: session._id, questions });
});

router.post("/:id/answer", authMiddleware, async (req: AuthRequest, res) => {
    const { questionId, answer } = req.body;
    const session = await interview.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    const questions = session.questions as Array<{ id: string; text: string }>;
    const question = questions.find((q: { id: string; text: string }) => q.id === questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const evaluation = await evaluateAnswer(question.text, answer ?? "");

    const answers = (session.answers as Array<unknown>) ?? [];
    answers.push({ questionId, answer, ...evaluation });
    session.answers = answers;
    await session.save();

    res.json(evaluation);
});

router.get("/:id/result", authMiddleware, async (req, res) => {
    const session = await interview.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
});

router.get("/history", authMiddleware, async (req: AuthRequest, res) => {
    const sessions = await interview.find({ userId: req.user!.id })
        .sort({ createdAt: -1 })
        .limit(50);
    res.json(sessions);
});

router.get("/statistics", authMiddleware, async (req: AuthRequest, res) => {
    const sessions = await interview.find({ userId: req.user!.id });
    
    if (sessions.length === 0) {
        return res.json({
            totalInterviews: 0,
            averageScore: 0,
            bestScore: 0,
            worstScore: 0,
            totalQuestionsAnswered: 0,
            roleBreakdown: {},
            difficultyBreakdown: {},
            recentProgress: []
        });
    }

    const scores = sessions.map(session => {
        const answers = session.answers as Array<{ score: number }>;
        if (answers.length === 0) return 0;
        return answers.reduce((sum, ans) => sum + (ans.score || 0), 0) / answers.length;
    });

    const roleBreakdown: Record<string, number> = {};
    const difficultyBreakdown: Record<string, number> = {};
    let totalQuestionsAnswered = 0;

    sessions.forEach(session => {
        if (session.role) {
            roleBreakdown[session.role] = (roleBreakdown[session.role] || 0) + 1;
        }
        
        const questions = session.questions as Array<{ difficulty?: string }>;
        questions.forEach(q => {
            if (q.difficulty) {
                difficultyBreakdown[q.difficulty] = (difficultyBreakdown[q.difficulty] || 0) + 1;
            }
        });

        const answers = session.answers as Array<unknown>;
        totalQuestionsAnswered += answers.length;
    });

    const recentProgress = sessions.slice(0, 10).map(session => {
        const answers = session.answers as Array<{ score: number }>;
        const avgScore = answers.length > 0 
            ? answers.reduce((sum, ans) => sum + (ans.score || 0), 0) / answers.length 
            : 0;
        return {
            date: session.createdAt,
            score: avgScore
        };
    }).reverse();

    res.json({
        totalInterviews: sessions.length,
        averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
        bestScore: Math.max(...scores),
        worstScore: Math.min(...scores),
        totalQuestionsAnswered,
        roleBreakdown,
        difficultyBreakdown,
        recentProgress
    });
});

export default router;
